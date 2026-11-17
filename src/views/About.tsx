import Link from 'next/link'
import { Inline, Lines } from '@/components/Inline'
import { RichBody, hasRichText } from '@/components/PostContent'
import { ABOUT } from '@/content/site'
import { getGlobalSafe, orText, toLines } from '@/lib/cms'
import { localize, type Lang } from '@/lib/i18n'

/** About page. Texts come from the CMS global "Über mich"; src/content/site.ts is the fallback. */
export async function AboutView({ lang }: { lang: Lang }) {
  const c = ABOUT[lang]
  const p = await getGlobalSafe('about-page')
  const de = lang === 'de'
  const t = {
    mission: toLines(de ? p?.missionDe : p?.missionEn, c.mission),
    intro: orText(de ? p?.twoWaysIntroDe : p?.twoWaysIntroEn, c.twoWays.intro),
    ways: toLines(de ? p?.waysDe : p?.waysEn, c.twoWays.ways),
    rememberHeading: orText(de ? p?.rememberHeadingDe : p?.rememberHeadingEn, c.remember.heading),
    contactLink: orText(de ? p?.contactLinkDe : p?.contactLinkEn, c.contactLink),
    bioHeading: toLines(de ? p?.bioHeadingDe : p?.bioHeadingEn, c.bio.heading),
    bio: de ? p?.bioDe : p?.bioEn,
    nowLink: orText(de ? p?.nowLinkDe : p?.nowLinkEn, c.bio.now),
  }
  const quote = p?.quote?.trim() || ''
  const author = p?.quoteAuthor?.trim() || ''

  return (
    <div className="wrap page about">
      <section className="about-mission">
        <h1>
          <Lines lines={t.mission} lang={lang} />
        </h1>
        <p>{t.intro}</p>
        <p className="two-ways">
          {t.ways.map((way, i) => (
            <span key={way}>
              {i > 0 && <span className="sep"> • </span>}
              {i + 1}
              <span className="star">*</span>
              <Inline text={way} lang={lang} />
            </span>
          ))}
        </p>
      </section>

      {quote && (
        <section className="about-remember">
          <h2>{t.rememberHeading}</h2>
          <blockquote>
            <p>{quote}</p>
            {author && <cite>— {author}</cite>}
          </blockquote>
          <Link className="button" href={localize('/contact', lang)}>
            {t.contactLink}
          </Link>
        </section>
      )}

      <section className="about-bio">
        <h2>
          <Lines lines={t.bioHeading} lang={lang} />
        </h2>
        {hasRichText(t.bio) ? (
          <div className="star-list-rich">
            <RichBody data={t.bio} />
          </div>
        ) : (
          <ul className="star-list">
            {c.bio.items.map((item) => (
              <li key={item.slice(0, 30)}>
                <Inline text={item} lang={lang} />
              </li>
            ))}
          </ul>
        )}
        <p className="about-now">
          <Link href={localize('/now', lang)}>{t.nowLink}</Link>
        </p>
      </section>
    </div>
  )
}
