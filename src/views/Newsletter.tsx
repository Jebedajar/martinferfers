import { KitForm } from '@/components/Forms'
import { PostContent } from '@/components/PostContent'
import { NEWSLETTER } from '@/content/site'
import { getGlobalSafe, orText } from '@/lib/cms'
import type { Lang } from '@/lib/i18n'

function Cta({ lang }: { lang: Lang }) {
  return (
    <div className="newsletter-cta">
      <KitForm lang={lang} compact />
    </div>
  )
}

export async function NewsletterView({ lang, confirmed }: { lang: Lang; confirmed?: boolean }) {
  const f = NEWSLETTER[lang]
  const page = await getGlobalSafe('newsletter-page')
  const de = lang === 'de'
  const content = de ? page?.contentDe : page?.contentEn
  const bio = de ? page?.bioDe : page?.bioEn
  const c = {
    title: orText(de ? page?.titleDe : page?.titleEn, f.title),
    subline: orText(de ? page?.sublineDe : page?.sublineEn, f.subline),
    joinHeading: orText(de ? page?.joinHeadingDe : page?.joinHeadingEn, f.joinHeading),
    confirmed: {
      heading: orText(de ? page?.confirmedHeadingDe : page?.confirmedHeadingEn, f.confirmed.heading),
      text: orText(de ? page?.confirmedTextDe : page?.confirmedTextEn, f.confirmed.text),
    },
  }
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
        <p className="newsletter-subline" lang="en">
          {c.subline}
        </p>
      </header>

      <Cta lang={lang} />

      {content && (
        <div className="newsletter-body">
          <PostContent data={content} />
        </div>
      )}

      <section className="newsletter-join">
        <h2>{c.joinHeading}</h2>
        <Cta lang={lang} />
      </section>

      {bio && (
        <section className="newsletter-bio">
          <PostContent data={bio} />
        </section>
      )}
    </div>
  )
}
