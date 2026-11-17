import { Banner } from '@/components/Banner'
import { KitForm } from '@/components/Forms'
import { Inline, Lines } from '@/components/Inline'
import { RichBody, hasRichText } from '@/components/PostContent'
import { HOME } from '@/content/site'
import { getGlobalSafe, toLines } from '@/lib/cms'
import type { Lang } from '@/lib/i18n'

/** Home page. Texts come from the CMS global "Startseite"; src/content/site.ts is the fallback. */
export async function HomeView({ lang }: { lang: Lang }) {
  const c = HOME[lang]
  const page = await getGlobalSafe('home-page')
  const de = lang === 'de'
  const hero = toLines(de ? page?.heroDe : page?.heroEn, c.hero.lines)
  const intro = de ? page?.introDe : page?.introEn
  const newsletter = de ? page?.newsletterDe : page?.newsletterEn
  const fallbackForm = c.blocks.find((b) => b.form)

  return (
    <>
      <Banner image="/images/photos/smiling-balloons.webp" size="slim">
        <h1 className="banner-title">
          <Lines lines={hero} lang={lang} />
        </h1>
      </Banner>

      <div className="wrap home-intro">
        {hasRichText(intro) ? (
          <div className="home-rich">
            <RichBody data={intro} />
          </div>
        ) : (
          c.blocks
            .filter((b) => !b.form)
            .map((b, i) => (
              <section className="home-block" key={i}>
                <p>
                  <Inline text={b.text} lang={lang} />
                </p>
              </section>
            ))
        )}
        <section className="home-block home-block-form" id="newsletter">
          {hasRichText(newsletter) ? (
            <RichBody data={newsletter} />
          ) : (
            fallbackForm && (
              <p>
                <Inline text={fallbackForm.text} lang={lang} />
              </p>
            )
          )}
          <KitForm lang={lang} compact />
        </section>
      </div>
    </>
  )
}
