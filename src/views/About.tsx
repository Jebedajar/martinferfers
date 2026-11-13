import Link from 'next/link'
import config from '@payload-config'
import { getPayload } from 'payload'
import { Inline, Lines } from '@/components/Inline'
import { ABOUT } from '@/content/site'
import { localize, type Lang } from '@/lib/i18n'

export async function AboutView({ lang }: { lang: Lang }) {
  const c = ABOUT[lang]
  let quote = ''
  let author = 'Bruce Springsteen'
  try {
    const payload = await getPayload({ config })
    const q = await payload.findGlobal({ slug: 'about-quote' })
    if (q?.quote) {
      quote = q.quote
      author = q.author || author
    }
  } catch (err) {
    console.error('about-quote', err)
  }
  return (
    <div className="wrap page about">
      <section className="about-mission">
        <h1>
          <Lines lines={c.mission} lang={lang} />
        </h1>
        <p>{c.twoWays.intro}</p>
        <p className="two-ways">
          {c.twoWays.ways.map((way, i) => (
            <span key={way}>
              {i > 0 && <span className="sep"> • </span>}
              {i + 1}
              <span className="star">*</span>
              {way}
            </span>
          ))}
        </p>
        <Link className="button" href={localize('/projects', lang)}>
          {c.projectsLink}
        </Link>
      </section>

      {quote && (
        <section className="about-remember">
          <h2>{c.remember.heading}</h2>
          <blockquote>
            <p>{quote}</p>
            <cite>— {author}</cite>
          </blockquote>
          <Link className="button" href={localize('/contact', lang)}>
            {c.contactLink}
          </Link>
        </section>
      )}

      <section className="about-bio">
        <h2>
          <Lines lines={c.bio.heading} lang={lang} />
        </h2>
        <ul className="star-list">
          {c.bio.items.map((item) => (
            <li key={item.slice(0, 30)}>
              <Inline text={item} lang={lang} />
            </li>
          ))}
        </ul>
        <p className="about-now">
          <Link href={localize('/now', lang)}>{c.bio.now}</Link>
        </p>
      </section>
    </div>
  )
}
