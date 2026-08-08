// The aperture is SightLine's signature: a camera iris that opens when you
// capture, and pulses like a slow sonar ping while the description is being
// generated — a small visual metaphor for "the app is looking, for you."
export default function ApertureButton({ status, onPress, label }) {
  const isBusy = status === 'thinking'

  return (
    <button
      type="button"
      onClick={onPress}
      disabled={isBusy}
      aria-label={label}
      className="relative flex h-24 w-24 items-center justify-center rounded-full
                 bg-amber text-ink shadow-[0_0_0_4px_rgba(232,163,61,0.18)]
                 transition-transform active:scale-95 disabled:cursor-wait
                 focus-visible:outline-offset-4"
    >
      {/* Ripple rings — decorative only */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full border-2 border-amber animate-iris"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full border-2 border-amber animate-iris"
        style={{ animationDelay: '0.7s' }}
      />

      <span
        className={`relative flex h-14 w-14 items-center justify-center rounded-full border-[3px] border-ink/70
                    ${isBusy ? 'animate-pulseRing' : ''}`}
      >
        {isBusy ? (
          <span className="block h-3 w-3 rounded-full bg-ink/70" />
        ) : (
          <span className="block h-7 w-7 rounded-full bg-ink/80" />
        )}
      </span>
    </button>
  )
}
