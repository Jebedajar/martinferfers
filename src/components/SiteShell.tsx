import '@fontsource/ibm-plex-mono/400.css'
import '@fontsource/ibm-plex-mono/500.css'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/400-italic.css'
import '@fontsource/ibm-plex-sans/600.css'
import '@/styles/site.css'
import type { Metadata, Viewport } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SITE, UI } from '@/content/site'
import type { Lang } from '@/lib/i18n'

export function siteMetadata(lang: Lang): Metadata {
  return {
    metadataBase: new URL(SITE.origin),
    title: { default: SITE.title, template: `%s — ${SITE.name}` },
    description: SITE.description[lang],
    openGraph: {
      siteName: SITE.name,
      type: 'website',
      locale: lang === 'de' ? 'de_DE' : 'en_US',
      images: [{ url: SITE.logo.src, width: SITE.logo.width, height: SITE.logo.height }],
    },
    twitter: { card: 'summary' },
    icons: { icon: '/favicon.png', apple: '/apple-touch-icon.png' },
  }
}

export const siteViewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1622' },
  ],
}

/** The <html> document shared by the German and the English root layout. */
export function SiteShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang}>
      <body>
        <a className="skip-link" href="#main">
          {UI[lang].skip}
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  )
}
