export default function ResultPanel({
  status,
  description,
  isSpeaking,
  onReplay,
  followupText,
  onFollowupChange,
  onFollowupSubmit,
  onMicPress,
  isListening,
  voiceSupported
}) {
  const placeholder =
    status === 'idle'
      ? 'Point the camera at something, then tap the shutter. SightLine will describe it out loud.'
      : status === 'thinking'
        ? 'Looking…'
        : ''

  return (
    <div className="flex w-full flex-col gap-4">
      <div
        role="status"
        aria-live="polite"
        className="min-h-[7rem] rounded-2xl border border-ink-line bg-ink-soft p-5 font-display text-xl leading-snug text-paper sm:text-2xl"
      >
        {description || <span className="text-mist">{placeholder}</span>}
      </div>

      {description && (
        <button
          type="button"
          onClick={onReplay}
          className="self-start text-sm font-semibold text-amber underline decoration-amber/40 underline-offset-4 hover:decoration-amber"
        >
          {isSpeaking ? 'Replaying…' : '🔊 Hear it again'}
        </button>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          onFollowupSubmit()
        }}
        className="flex items-center gap-2 rounded-2xl border border-ink-line bg-ink-soft p-2"
      >
        <input
          type="text"
          value={followupText}
          onChange={(e) => onFollowupChange(e.target.value)}
          placeholder="Ask a follow-up — “what color is it?”"
          className="flex-1 bg-transparent px-3 py-2 font-body text-paper placeholder:text-mist focus:outline-none"
          aria-label="Ask a follow-up question about what SightLine just saw"
        />
        {voiceSupported && (
          <button
            type="button"
            onClick={onMicPress}
            aria-pressed={isListening}
            aria-label={isListening ? 'Stop listening' : 'Ask by voice'}
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors
                        ${isListening ? 'bg-coral text-ink' : 'bg-ink-line text-paper hover:bg-amber hover:text-ink'}`}
          >
            {isListening ? '●' : '🎤'}
          </button>
        )}
        <button
          type="submit"
          className="shrink-0 rounded-full bg-amber px-4 py-2 font-display text-sm font-semibold text-ink hover:bg-amber-bright"
        >
          Ask
        </button>
      </form>
    </div>
  )
}
