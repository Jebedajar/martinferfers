import Link from 'next/link'
import { SITE, UI } from '@/content/site'
import { localize, type Lang } from '@/lib/i18n'

export function Footer({ lang }: { lang: Lang }) {
  const ui = UI[lang]
  return (
    <footer className="site-footer">
      <div className="wrap footer-cta">
        <p className="footer-claim">
          {SITE.footer.claim[lang]}
          <span className="star" aria-hidden="true">*</span>
        </p>
        <Link className="button button-light" href={localize('/contact', lang)}>
          {SITE.footer.cta[lang]}
        </Link>
      </div>
      <div className="wrap footer-bottom">
        <span>{SITE.footer.line}</span>
        <nav aria-label="Footer">
          <Link href={localize('/impressum', lang)}>{ui.impressum}</Link>
          <a href={SITE.footer.twitter} target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href="#top">{ui.backToTop}</a>
        </nav>
      </div>
    </footer>
  )
}
