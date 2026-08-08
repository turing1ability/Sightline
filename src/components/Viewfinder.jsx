import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'

const Viewfinder = forwardRef(function Viewfinder(_, ref) {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const streamRef = useRef(null)
  const [error, setError] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: 'environment' } },
          audio: false
        })
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play()
        }
        setReady(true)
      } catch (err) {
        setError(
          err?.name === 'NotAllowedError'
            ? 'Camera access was denied. Allow camera access in your browser settings and reload.'
            : 'Could not reach a camera on this device.'
        )
      }
    }

    start()
    return () => {
      cancelled = true
      streamRef.current?.getTracks().forEach((t) => t.stop())
    }
  }, [])

  useImperativeHandle(ref, () => ({
    captureFrame() {
      const video = videoRef.current
      const canvas = canvasRef.current
      if (!video || !canvas || !ready) return null

      const width = video.videoWidth
      const height = video.videoHeight
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, width, height)

      // JPEG at 0.82 keeps the upload small and fast over mobile data
      // without visibly hurting description quality.
      return canvas.toDataURL('image/jpeg', 0.82)
    }
  }))

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-ink-line bg-ink-soft aspect-[3/4] sm:aspect-video">
      {error ? (
        <div className="flex h-full items-center justify-center p-6 text-center text-mist font-body">
          {error}
        </div>
      ) : (
        <video
          ref={videoRef}
          playsInline
          muted
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
      )}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
})

export default Viewfinder
