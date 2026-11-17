import { AwesomeVideo } from '@/components/AwesomeVideo'
import type { Lang } from '@/lib/i18n'

const VIDEO_ID = 'StTqXEQ2l-Y'

const TEXT = {
  de: { lines: ['Toll, dass Du an Bord bist.', 'You´re awesome!'], video: 'Video: You´re awesome', sound: 'Ton an' },
  en: { lines: ['Great to have you on board.', 'You´re awesome!'], video: 'Video: You´re awesome', sound: 'Sound on' },
}

/**
 * Thank-you page after confirming the newsletter subscription (Kit redirects to /newsletter?confirmed=1,
 * which forwards here). The video starts automatically – browsers only allow that muted, so there is a
 * "sound on" button below it.
 */
export function AwesomeView({ lang }: { lang: Lang }) {
  const t = TEXT[lang]
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
      <AwesomeVideo videoId={VIDEO_ID} title={t.video} soundLabel={t.sound} />
    </div>
  )
}
