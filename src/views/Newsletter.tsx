import { KitForm } from '@/components/Forms'
import { Inline } from '@/components/Inline'
import { NEWSLETTER } from '@/content/site'
import type { Lang } from '@/lib/i18n'

function Cta({ lang, note }: { lang: Lang; note: string }) {
  return (
    <div className="newsletter-cta">
      <p className="newsletter-cta-note">{note}</p>
      <KitForm lang={lang} compact />
    </div>
  )
}

export function NewsletterView({ lang, confirmed }: { lang: Lang; confirmed?: boolean }) {
  const c = NEWSLETTER[lang]
  return (
    <div className="wrap page newsletter">
      {confirmed && (
        <div className="notice" role="status">
          <strong>{c.confirmed.heading}</strong> {c.confirmed.text}
        </div>
      )}
      <header className="newsletter-head">
        <h1>
          {c.title}
          <span className="star" aria-hidden="true">*</span>
        </h1>
        <p className="newsletter-subline">{c.subline}</p>
      </header>

      <Cta lang={lang} note={c.note} />

      <div className="newsletter-body">
        {c.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <h2>{c.interestsHeading}</h2>
        <ul className="tag-list">
          {c.interests.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <h2>{c.expectHeading}</h2>
        <ul className="star-list">
          {c.expect.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>

      <section className="newsletter-join">
        <h2>{c.joinHeading}</h2>
        <Cta lang={lang} note={c.note} />
      </section>

      <section className="newsletter-bio">
        <p>
          <Inline text={c.bio} lang={lang} />
        </p>
      </section>
    </div>
  )
}
