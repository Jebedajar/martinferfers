import { Banner } from '@/components/Banner'
import { KitForm } from '@/components/Forms'
import { Inline, Lines } from '@/components/Inline'
import { HOME } from '@/content/site'
import type { Lang } from '@/lib/i18n'

export function HomeView({ lang }: { lang: Lang }) {
  const c = HOME[lang]
  return (
    <>
      <Banner image="/images/photos/smiling-balloons.webp" size="slim">
        <h1 className="banner-title">
          <Lines lines={c.hero.lines} lang={lang} />
        </h1>
      </Banner>

      <div className="wrap home-intro">
        {c.blocks.map((b, i) => (
          <section className={b.form ? 'home-block home-block-form' : 'home-block'} key={i} id={b.form ? 'newsletter' : undefined}>
            <p>
              <Inline text={b.text} lang={lang} />
            </p>
            {b.form && <KitForm lang={lang} compact />}
          </section>
        ))}
      </div>
    </>
  )
}
