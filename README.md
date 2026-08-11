# 👁️ SightLine

### AI eyes for anyone.

Point your camera at the world. Tap once. Hear it described out loud — then ask follow-up questions by voice or text, without recapturing. 🎙️✨

<!-- Swap this for a real screenshot or GIF — repos with a visible hero image get opened way more often 👀 -->
<!-- ![SightLine screenshot](./docs/screenshot.png) -->

**🔗 Live demo:** `<your Vercel URL here>`
**📽️ Demo video:** `<your video link here>`

---

## 💡 The problem

Screen readers solved the web for blind and low-vision users. The physical world never got an equivalent — a kitchen counter, a bus stop, a handwritten note. Dedicated assistive hardware exists, but it costs **$300–600** 💸, putting it out of reach for a lot of the people who need it most.

Almost everyone already carries a phone with a camera in their pocket. 📱 SightLine turns that phone into the missing layer — for **$0**.

## ⚙️ How it works

1. 📸 Open SightLine, point the camera at anything
2. 👆 Tap the shutter — the frame goes to Gemini's vision model
3. 🔊 A short, spoken-style description reads out loud automatically — safety-relevant stuff (steps, obstacles, moving vehicles) comes first, then layout, then objects
4. 🗣️ Ask a follow-up — by voice or text — about the same scene, no recapturing needed

## ✨ Features

- 🎯 One-tap scene description, spoken automatically
- 💬 Follow-up Q&A on the same frame, by voice or text
- 🦺 Safety-first description ordering — hazards before decoration
- ♿ Fully keyboard-navigable with `aria-live` captions — the interface itself doesn't introduce a second accessibility problem while solving the first one
- 🔑 Automatic multi-key fallback so a rate limit never breaks a live demo
- 🌐 Runs on any phone or laptop with a camera and a browser — no app store, no extra hardware

## 🧱 Tech stack

| Layer | Tech |
|---|---|
| Frontend | ⚛️ React + Vite, 🎨 Tailwind CSS |
| Voice | 🗣️ Web Speech API (`SpeechSynthesis` + `SpeechRecognition`) |
| AI | 🤖 Gemini API (`gemini-3-flash-preview`) |
| Backend | ⚡ Vercel serverless function |
| Hosting | ▲ Vercel, auto-deployed from GitHub |

## 🚀 Run it locally

Requires Node.js 18+ and a free [Gemini API key](https://aistudio.google.com) — no credit card needed. 🆓

```bash
npm install
cp .env.example .env      # paste your key into .env

npm install -g vercel     # one-time
vercel dev                # serves the React app AND /api/describe together
```

⚠️ Use `vercel dev`, not plain `npm run dev` — Vite alone won't run the `/api/describe` function, so captures will 404.

Open the printed URL and allow camera access. 📷

## ☁️ Deploying your own copy

1. Push this repo to GitHub
2. Import it at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects Vite ✅
3. Add `GEMINI_API_KEY` (and optionally `GEMINI_API_KEY_2` / `_3` for extra rate-limit headroom 🔑🔑🔑) in Project Settings → Environment Variables
4. Deploy 🚀

## 🌍 Browser support

Camera access and voice input need a secure context (HTTPS or `localhost`) — automatic once deployed. Voice follow-ups use `webkitSpeechRecognition`, supported on Chrome/Edge 🟢; other browsers fall back to the text box gracefully rather than breaking. 🛡️

## 🔭 What's next

- 📶 Offline / low-bandwidth mode for compressed descriptions on poor signal
- 🗂️ Saved session history to revisit past descriptions
- 🌐 Multi-language output

## 👤 Team

Built solo. 🙌

## 📄 License

MIT
