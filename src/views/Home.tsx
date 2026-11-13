import { Banner } from '@/components/Banner'
import { KitForm } from '@/components/Forms'
import { Inline, Lines } from '@/components/Inline'
import { HOME } from '@/content/site'
import type { Lang } from '@/lib/i18n'

export function HomeView({ lang }: { lang: Lang }) {
  const c = HOME[lang]
  return (
    <>
      <Banner image="/images/photos/smiling-balloons.webp">
        <h1 className="banner-title">
          <Lines lines={c.hero.lines} lang={lang} />
        </h1>
      </Banner>

      <div className="wrap home-intro">
        {c.blocks.map((b, i) => (
          <section className={b.image ? 'home-block home-block-image' : 'home-block'} key={i}>
            <p>
              <Inline text={b.text} lang={lang} />
            </p>
            {b.image && (
              <a className="home-block-figure" href={b.image.href} target="_blank" rel="noopener noreferrer">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.image.src} alt={b.image.alt} loading="lazy" />
              </a>
            )}
          </section>
        ))}
      </div>

      <section className="list-signup" id="newsletter">
        <div className="wrap list-inner">
          <div className="list-copy">
            <h2>{c.list.heading}</h2>
            <p className="list-subline">{c.list.subline}</p>
            <p className="list-note">{c.list.note}</p>
          </div>
          <KitForm lang={lang} compact />
        </div>
      </section>
    </>
  )
}
