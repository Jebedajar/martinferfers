import type { Metadata } from 'next'
import { META, SITE } from '@/content/site'
import { localize, type Lang } from '@/lib/i18n'

/** Title, description, canonical URL, language alternates and social preview for a fixed page. */
export function pageMeta(page: keyof typeof META, lang: Lang, path: string): Metadata {
  const { title, description } = META[page][lang]
  const url = localize(path, lang)
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url, languages: { de: localize(path, 'de'), en: localize(path, 'en') } },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type: 'website',
      locale: lang === 'de' ? 'de_DE' : 'en_US',
      alternateLocale: lang === 'de' ? 'en_US' : 'de_DE',
    },
    twitter: { card: 'summary', title, description },
  }
}
