import config from '@payload-config'
import { getPayload } from 'payload'
import { KitForm } from '@/components/Forms'
import { PostContent } from '@/components/PostContent'
import { NEWSLETTER } from '@/content/site'
import type { Lang } from '@/lib/i18n'

function Cta({ lang }: { lang: Lang }) {
  return (
    <div className="newsletter-cta">
      <KitForm lang={lang} compact />
    </div>
  )
}

export async function NewsletterView({ lang, confirmed }: { lang: Lang; confirmed?: boolean }) {
  const c = NEWSLETTER[lang]
  const payload = await getPayload({ config })
  const page = await payload.findGlobal({ slug: 'newsletter-page', depth: 0 })
  const content = lang === 'de' ? page.contentDe : page.contentEn
  const bio = lang === 'de' ? page.bioDe : page.bioEn
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
