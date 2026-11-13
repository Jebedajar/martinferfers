'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { SITE, UI } from '@/content/site'
import { localize, other, splitPath } from '@/lib/i18n'

export function Header() {
  const pathname = usePathname() || '/'
  const { lang, path } = splitPath(pathname)
  const ui = UI[lang]
  const [open, setOpen] = useState(false)
  const isActive = (href: string) => path === href || path.startsWith(`${href}/`)
  const switchLang = other(lang)
  return (
    <header className="site-header" id="top">
      <div className="wrap header-inner">
        <Link href={localize('/', lang)} className="logo" aria-label={ui.home}>
          <picture>
            <source srcSet={SITE.logo.srcDark} media="(prefers-color-scheme: dark)" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={SITE.logo.src} width={SITE.logo.width} height={SITE.logo.height} alt={SITE.logo.alt} />
          </picture>
        </Link>
        <button className="nav-toggle" aria-expanded={open} aria-controls="main-nav" onClick={() => setOpen((v) => !v)}>
          {open ? ui.close : ui.menu}
        </button>
        <nav id="main-nav" className={open ? 'nav is-open' : 'nav'} aria-label="Main">
          {SITE.nav.map((item) => (
            <Link
              key={item.href}
              href={localize(item.href, lang)}
              aria-current={isActive(item.href) ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label[lang]}
            </Link>
          ))}
          {/* Plain <a>: the other language has its own root layout, so this is a full page load anyway */}
          <a className="lang-switch" href={localize(path, switchLang)} hrefLang={switchLang} lang={switchLang} title={ui.switchLabel}>
            <span className="lang-short">{ui.switchShort}</span>
            <span className="lang-long">{ui.switchTo}</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
