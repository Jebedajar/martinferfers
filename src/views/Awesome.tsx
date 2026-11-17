import type { Lang } from '@/lib/i18n'

const VIDEO_ID = 'StTqXEQ2l-Y'

const TEXT = {
  de: { lines: ['Toll, dass Du an Bord bist.', 'You´re awesome!'], video: 'Video: You´re awesome' },
  en: { lines: ['Great to have you on board.', 'You´re awesome!'], video: 'Video: You´re awesome' },
}

/**
 * Thank-you page after confirming the newsletter subscription (Kit redirects to /newsletter?confirmed=1,
 * which forwards here). The video starts automatically – browsers only allow that muted.
 */
export function AwesomeView({ lang }: { lang: Lang }) {
  const t = TEXT[lang]
  const src = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1`
  return (
    <div className="wrap page awesome">
      <h1>
        {t.lines[0]}
        <br />
        <span className="awesome-line">
          {t.lines[1]}
          <span className="star" aria-hidden="true">*</span>
        </span>
      </h1>
      <div className="awesome-video">
        <iframe
          src={src}
          title={t.video}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  )
}
