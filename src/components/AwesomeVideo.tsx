'use client'
import { useRef, useState } from 'react'

const ORIGIN = 'https://www.youtube-nocookie.com'

/**
 * YouTube embed that autoplays muted (the only way browsers allow autoplay) plus a "sound on" button.
 * The click is a user gesture, so the player may then unmute (via the IFrame API's postMessage commands).
 */
export function AwesomeVideo({ videoId, title, soundLabel }: { videoId: string; title: string; soundLabel: string }) {
  const frame = useRef<HTMLIFrameElement>(null)
  const [soundOn, setSoundOn] = useState(false)
  const src = `${ORIGIN}/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`

  const unmute = () => {
    const win = frame.current?.contentWindow
    if (!win) return
    for (const [func, args] of [['unMute', []], ['setVolume', [100]], ['playVideo', []]] as const) {
      win.postMessage(JSON.stringify({ event: 'command', func, args }), ORIGIN)
    }
    setSoundOn(true)
  }

  return (
    <>
      <div className="awesome-video">
        <iframe
          ref={frame}
          src={src}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      {!soundOn && (
        <button type="button" className="button awesome-sound" onClick={unmute}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
          </svg>
          {soundLabel}
        </button>
      )}
    </>
  )
}
