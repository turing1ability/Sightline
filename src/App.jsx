import { useRef, useState } from 'react'
import Viewfinder from './components/Viewfinder.jsx'
import ApertureButton from './components/ApertureButton.jsx'
import ResultPanel from './components/ResultPanel.jsx'
import { useSpeech } from './hooks/useSpeech.js'

async function askSightLine({ image, question }) {
  const res = await fetch('/api/describe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ image, question })
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.error || 'SightLine could not reach the model.')
  }
  const data = await res.json()
  return data.text
}

export default function App() {
  const viewfinderRef = useRef(null)
  const lastImageRef = useRef(null)

  const [status, setStatus] = useState('idle') // idle | thinking | error
  const [description, setDescription] = useState('')
  const [followupText, setFollowupText] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const { speak, isSpeaking, listen, isListening, voiceSupported } = useSpeech()

  async function runQuery(question) {
    const image = question ? lastImageRef.current : viewfinderRef.current?.captureFrame()
    if (!image) {
      setErrorMsg('Camera is not ready yet — give it a second and try again.')
      setStatus('error')
      return
    }
    lastImageRef.current = image
    setStatus('thinking')
    setErrorMsg('')
    try {
      const text = await askSightLine({ image, question })
      setDescription(text)
      setStatus('idle')
      speak(text)
    } catch (err) {
      setErrorMsg(err.message)
      setStatus('error')
    }
  }

  function handleCapture() {
    runQuery(null)
  }

  function handleFollowupSubmit() {
    const question = followupText.trim()
    if (!question || !lastImageRef.current) return
    setFollowupText('')
    runQuery(question)
  }

  function handleMicPress() {
    if (isListening) return
    listen((transcript) => {
      setFollowupText(transcript)
      if (lastImageRef.current) {
        setStatus('thinking')
        askSightLine({ image: lastImageRef.current, question: transcript })
          .then((text) => {
            setDescription(text)
            setStatus('idle')
            speak(text)
            setFollowupText('')
          })
          .catch((err) => {
            setErrorMsg(err.message)
            setStatus('error')
          })
      }
    })
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-5 py-8 sm:max-w-lg">
      <header className="flex flex-col gap-1">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-paper">
          Sight<span className="text-amber">Line</span>
        </h1>
        <p className="font-body text-sm text-mist">
          Point. Tap. Listen. Ask anything about what's in front of you.
        </p>
      </header>

      <div className="relative">
        <Viewfinder ref={viewfinderRef} />
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
          <ApertureButton
            status={status}
            onPress={handleCapture}
            label={status === 'thinking' ? 'SightLine is looking' : 'Describe what the camera sees'}
          />
        </div>
      </div>

      <div className="mt-8">
        {errorMsg && (
          <p role="alert" className="mb-3 rounded-xl bg-coral/10 px-4 py-3 text-sm text-coral">
            {errorMsg}
          </p>
        )}
        <ResultPanel
          status={status}
          description={description}
          isSpeaking={isSpeaking}
          onReplay={() => speak(description)}
          followupText={followupText}
          onFollowupChange={setFollowupText}
          onFollowupSubmit={handleFollowupSubmit}
          onMicPress={handleMicPress}
          isListening={isListening}
          voiceSupported={voiceSupported}
        />
      </div>

      <footer className="mt-auto pt-6 text-center text-xs text-mist">
        Built for Build Beyond · powered by Claude's vision
      </footer>
    </div>
  )
}
