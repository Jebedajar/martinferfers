import Link from 'next/link'
import { resolveHref } from '@/components/Inline'
import { SITE, UI } from '@/content/site'
import { localize, type Lang } from '@/lib/i18n'

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith('/')) return <Link href={href}>{children}</Link>
  const external = /^https?:/.test(href)
  return (
    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  )
}

export function Footer({ lang }: { lang: Lang }) {
  const ui = UI[lang]
  const f = SITE.footer
  return (
    <footer className="site-footer">
      <div className="wrap footer-cta">
        <div className="footer-mission" lang="en">
          {f.mission.map((line, i) => (
            <p key={i}>
              {line}
              {i === f.mission.length - 1 && (
                <span className="star" aria-hidden="true">
                  *
                </span>
              )}
            </p>
          ))}
        </div>
        <Link className="button button-light" href={localize('/contact', lang)}>
          {f.cta[lang]}
        </Link>
      </div>
      <div className="wrap footer-columns">
        {f.columns.map((col) => (
          <nav key={col.heading.en} aria-label={col.heading[lang]}>
            <h2>{col.heading[lang]}</h2>
            <ul>
              {col.links.map((l) => {
                const href = typeof l.href === 'string' ? resolveHref(l.href, lang) : l.href[lang]
                return (
                  <li key={l.label.en}>
                    <FooterLink href={href}>{l.label[lang]}</FooterLink>
                  </li>
                )
              })}
            </ul>
          </nav>
        ))}
      </div>
      <div className="wrap footer-bottom">
        <span>{f.copyright}</span>
        <nav aria-label="Footer">
          <Link href={localize('/impressum', lang)}>{ui.impressum}</Link>
          <a href={f.twitter} target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href="#top">{ui.backToTop}</a>
        </nav>
      </div>
    </footer>
  )
}
