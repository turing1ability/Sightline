# SightLine

**AI eyes for anyone.** Point your camera at the world, tap once, and hear it described out loud — then ask follow-up questions by voice or text, without recapturing.

<!-- Swap this for a real screenshot or GIF once you have one — repos with a visible hero image get opened far more often than ones that don't. -->
<!-- ![SightLine screenshot](./docs/screenshot.png) -->

---

## The problem

Screen readers solved the web for blind and low-vision users. The physical world — a kitchen counter, a bus stop, a handwritten note — never got an equivalent. Dedicated assistive hardware for this exists, but it typically costs $300–600, putting it out of reach for a lot of the people who need it most. Almost everyone already carries a phone with a camera. SightLine turns that phone into the missing layer.

## How it works

1. Open SightLine and point the camera at anything.
2. Tap the shutter. The frame is sent to Gemini's vision model, which returns a short, natural-sounding description — safety-relevant details (steps, obstacles, moving vehicles) are prioritized before general layout and objects.
3. The description is read aloud automatically.
4. Ask a follow-up question — by voice or by typing — about the same scene, no need to recapture. ("What color is it?" "Is there a step down?" "What does the sign say?")

## Features

- One-tap scene description, spoken automatically
- Follow-up Q&A on the same frame, by voice or text
- Safety-first description ordering — hazards before decoration
- Fully keyboard-navigable with `aria-live` captions, so the interface itself doesn't introduce a second accessibility problem while solving the first one
- Runs on any phone or laptop with a camera and a browser — no app store, no extra hardware

## Tech stack

React + Vite, Tailwind CSS, the Web Speech API (`SpeechSynthesis` + `SpeechRecognition`) for voice I/O, the Gemini API (`gemini-3-flash-preview`) for scene understanding, deployed as a Vercel serverless function + static site.

## Try it

Live demo: `<your Vercel URL here>`

## Run it locally

Requires Node.js 18+ and a free [Gemini API key](https://aistudio.google.com) (click "Get API key" — no credit card needed for the free tier).

```bash
npm install
cp .env.example .env      # paste your key into .env

npm install -g vercel     # one-time
vercel dev                # serves the React app AND /api/describe together
```

Use `vercel dev`, not plain `npm run dev` — Vite alone won't run the `/api/describe` serverless function, so capture requests will 404. `vercel dev` picks up `.env` automatically.

Open the printed URL and allow camera access.

## Deploying your own copy

1. Push this repo to GitHub.
2. Import it at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Vite, no config changes needed.
3. In **Project Settings → Environment Variables**, add `GEMINI_API_KEY`.
4. Deploy.

## Notes on browser support

Camera access and voice input both require a secure context (HTTPS or `localhost`) — covered automatically once deployed. Voice follow-ups use `webkitSpeechRecognition`, supported on Chrome and Edge; on other browsers the mic button doesn't render and the text box takes over — intentional graceful degradation, not a gap.

## What's next

Ideas not yet built: offline/low-bandwidth mode for a compressed description when signal is poor, a saved-session history so descriptions can be revisited, and multi-language output.

## Team

Built solo. See `SUBMISSION.md` for the per-hackathon write-up.

## License

MIT
