import { connection } from 'next/server'
import { AwesomeVideo } from '@/components/AwesomeVideo'
import { getGlobalSafe } from '@/lib/cms'
import type { Lang } from '@/lib/i18n'

const VIDEO_ID = 'StTqXEQ2l-Y'

const TEXT = {
  de: { lines: ['Toll, dass Du an Bord bist.', 'You´re awesome!'], video: 'Video: You´re awesome', sound: 'Ton an' },
  en: { lines: ['Great to have you on board.', 'You´re awesome!'], video: 'Video: You´re awesome', sound: 'Sound on' },
}

/** Turns URLs in a plain CMS text into links (shown without "https://"). */
function linkify(text: string) {
  return text.split(/(https?:\/\/\S+)/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} style={{ overflowWrap: 'anywhere' }}>
        {part.replace(/^https?:\/\//, '')}
      </a>
    ) : (
      part
    ),
  )
}

/**
 * Thank-you page after confirming the newsletter subscription (Kit redirects to /newsletter?confirmed=1,
 * which forwards here). The video starts automatically – browsers only allow that muted, so there is a
 * "sound on" button below it. Below that: the "Bestätigungshinweis" text from the CMS (Newsletter-Seite →
 * "Hinweis nach bestätigter Anmeldung: Text"), e.g. with the link to the latest issue; URLs become links.
 */
export async function AwesomeView({ lang }: { lang: Lang }) {
  await connection() // read the CMS on every request, so changes show up without a new deploy
  const t = TEXT[lang]
  const page = await getGlobalSafe('newsletter-page')
  const note = (lang === 'de' ? page?.confirmedTextDe : page?.confirmedTextEn)?.trim()
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
      {note && <p style={{ marginTop: 32 }}>{linkify(note)}</p>}
    </div>
  )
}
