// POST /api/describe
// Body: { image: "data:image/jpeg;base64,...", question?: string }
//
// Runs server-side (Vercel serverless function) so the Gemini API key
// stays out of the browser. Set GEMINI_API_KEY in your Vercel project's
// environment variables before deploying (same key you generated in
// Google AI Studio for local dev).

// gemini-3-flash-preview is Google's current free-tier, vision-capable
// model as of August 2026. If your key hits a quota or 404 error, check
// aistudio.google.com for whichever Flash model is free on your account —
// swap the string below, nothing else needs to change.
const MODEL = 'gemini-3-flash-preview'

const DESCRIBE_PROMPT = `Describe this scene concisely for someone who cannot see it, in 2-4 natural spoken sentences.
Priority order: (1) anything relevant to immediate safety — steps, curbs, obstacles, moving vehicles, hot or sharp things, (2) the general layout of the space, (3) notable objects, people, or visible text.
Speak directly, as if you are their eyes right now — e.g. "You're facing a kitchen counter with a kettle on your left." Do not say "I see" or "the image shows." No bullet points, no headers, no preamble.`

function followupPrompt(question) {
  return `Answer this question about the same scene, in one or two natural spoken sentences, speaking directly as if you are describing it to someone who cannot see it. Do not say "I see" or "the image shows."\n\nQuestion: "${question}"`
}

function parseDataUrl(dataUrl) {
  const match = /^data:(image\/\w+);base64,(.+)$/.exec(dataUrl || '')
  if (!match) return null
  return { mimeType: match[1], data: match[2] }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Use POST.' })
  }

  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Server is missing GEMINI_API_KEY.' })
  }

  const { image, question } = req.body || {}
  const parsed = parseDataUrl(image)
  if (!parsed) {
    return res.status(400).json({ error: 'No valid image was captured — try again.' })
  }

  const promptText = question ? followupPrompt(question) : DESCRIBE_PROMPT

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { inline_data: { mime_type: parsed.mimeType, data: parsed.data } },
                { text: promptText }
              ]
            }
          ]
        })
      }
    )

    if (!response.ok) {
      const errBody = await response.text()
      console.error('Gemini API error:', errBody)
      return res.status(502).json({ error: 'SightLine could not reach the model. Try again.' })
    }

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text || '')
      .join(' ')
      .trim()

    if (!text) {
      return res.status(502).json({ error: 'No description came back — try again.' })
    }

    return res.status(200).json({ text })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Something went wrong describing that scene.' })
  }
}
