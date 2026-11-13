export const LANGS = ['de', 'en'] as const
export type Lang = (typeof LANGS)[number]

/** German is the default language (no prefix), English lives under /en. */
export const DEFAULT_LANG: Lang = 'de'

export type L<T = string> = Record<Lang, T>

export const other = (lang: Lang): Lang => (lang === 'de' ? 'en' : 'de')

/** Turns a site path like "/about" into the path for the given language ("/en/about"). */
export function localize(path: string, lang: Lang) {
  if (!path.startsWith('/') || path.startsWith('//')) return path
  if (lang === DEFAULT_LANG) return path
  return path === '/' ? `/${lang}` : `/${lang}${path}`
}

/** Splits a pathname into language and language-neutral path. */
export function splitPath(pathname: string): { lang: Lang; path: string } {
  const m = pathname.match(/^\/en(\/.*)?$/)
  if (m) return { lang: 'en', path: m[1] || '/' }
  return { lang: 'de', path: pathname || '/' }
}

export function formatDate(value: string, lang: Lang) {
  return new Intl.DateTimeFormat(lang === 'de' ? 'de-DE' : 'en-US', { dateStyle: 'long', timeZone: 'Europe/Berlin' }).format(
    new Date(value),
  )
}
