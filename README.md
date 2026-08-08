# SightLine — AI eyes for anyone

Point your camera at the world. Tap the shutter. SightLine describes what's
in front of you out loud, then you can ask follow-up questions by voice or
text — "what color is it?", "is there a step down?", "what does the sign
say?" — without recapturing.

Built for **Build Beyond**.

---

## Run it locally

You need Node.js 18+ and a free [Gemini API key](https://aistudio.google.com) (click "Get API key" — no credit card needed for the free tier).

```bash
npm install
cp .env.example .env      # then paste your key into .env

npm install -g vercel     # one-time
vercel dev                # serves the React app AND /api/describe together
```

`vercel dev` is what you want here — plain `npm run dev` (Vite alone) won't
run the `/api/describe` serverless function, so capture requests will fail
with a 404. `vercel dev` picks up `.env` automatically.

Open the URL it prints, allow camera access, and tap the amber button.

> Camera access requires a "secure context." `localhost` counts as secure,
> so local dev works fine. If you test on your phone over your home Wi-Fi,
> use the deployed HTTPS URL below rather than your laptop's local IP.

## Troubleshooting

- **404 or "model not found" error:** Google occasionally renames or retires
  free-tier models. Open `api/describe.js`, change the `MODEL` constant near
  the top to whichever Flash model your Google AI Studio dashboard currently
  lists as free, and save — nothing else in the file needs to change.
- **429 / rate limit error:** the free tier has a requests-per-minute cap.
  Wait a few seconds between captures during testing.
- If you ever paste your API key into a chat, terminal command, or shared
  screen, treat it as compromised and generate a fresh one in AI Studio —
  it takes seconds and avoids someone else running up your quota.

## Deploy (for your submission link + live demo)

1. Push this folder to a new GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo. Vercel
   auto-detects Vite — no config changes needed.
3. In **Project Settings → Environment Variables**, add `GEMINI_API_KEY`
   with your key.
4. Deploy. You'll get a public `https://your-project.vercel.app` link —
   this is both your live demo link and what judges can try themselves.

## Browser support notes

- Camera (`getUserMedia`) and voice input (`SpeechRecognition`) both need
  HTTPS — covered automatically once deployed on Vercel.
- Voice follow-up questions use `webkitSpeechRecognition`, which is Chrome
  / Edge only. On other browsers the mic button simply doesn't render, and
  the text box still works — this is intentional graceful degradation, not
  a bug, and worth mentioning to judges as a deliberate accessibility
  fallback rather than a gap.

---

## Submission text (copy into the Build Beyond form)

**Project Name:** SightLine

**The Idea:**
Screen readers solved the web for blind and low-vision users, but the
physical world — a kitchen counter, a bus stop, a handwritten note — has no
equivalent. Dedicated hardware for this exists but costs hundreds of
dollars. SightLine turns any phone or laptop into that missing layer, using
Claude's vision to narrate the world the way a sighted companion would.

**How It Works:**
Open SightLine, point the camera at anything, and tap the shutter button.
The frame is sent to Claude, which returns a short, spoken-style
description — prioritizing safety-relevant details (steps, obstacles,
moving vehicles) before general layout and objects. The description is
read aloud automatically. You can then ask a follow-up question, by typing
or by voice, and get an answer about the same scene without recapturing.

**Main Features:**
- One-tap scene description, read aloud automatically
- Follow-up Q&A about the same frame, by voice or text
- Safety-first description ordering (hazards before decoration)
- Full keyboard focus states and `aria-live` captions, so the interface
  itself doesn't create a second accessibility problem while solving the
  first one
- Works on any phone or laptop with a camera and a browser — no app store,
  no hardware

**Technology Stack:**
React + Vite, Tailwind CSS, the Web Speech API (`SpeechSynthesis` and
`SpeechRecognition`) for voice I/O, the Gemini API (`gemini-3-flash-preview`)
for scene understanding, deployed as a Vercel serverless function + static
site.

**Intended Audience:**
Blind and low-vision users as the primary audience — anyone who currently
relies on asking a person nearby, or on expensive dedicated hardware.
Secondary audience: sighted caregivers or family members setting it up,
and anyone in a low-light or hands-busy situation (cooking, driving)
where a spoken description is faster than looking.

---

## Demo script (for your video / live table demo)

1. Open the app on your phone, camera pointed at your hackathon table.
2. Tap the aperture button — let it describe the table out loud.
3. Ask a voice follow-up: "is there anything hot on the table?" or "what
   color is the laptop?" — shows the follow-up flow without recapturing.
4. Hand the phone to the judge and let them try it on something of their
   choosing. This is the moment that sells it — a demo the judge
   participates in is far more memorable than one they only watch.
5. Close by stating the cost comparison in one sentence: dedicated
   assistive hardware for this runs $300–600; SightLine runs on hardware
   people already own.
