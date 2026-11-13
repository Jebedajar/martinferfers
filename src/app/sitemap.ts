import type { MetadataRoute } from 'next'
import { SITE } from '@/content/site'
import { localize } from '@/lib/i18n'
import { getPosts, postLang } from '@/lib/posts'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = ['/', '/about', '/newsletter', '/blog', '/projects', '/contact', '/now', '/impressum']
  const pages = paths.map((p) => ({
    url: `${SITE.origin}${localize(p, 'de')}`,
    alternates: { languages: { de: `${SITE.origin}${localize(p, 'de')}`, en: `${SITE.origin}${localize(p, 'en')}` } },
  }))
  let posts: MetadataRoute.Sitemap = []
  try {
    posts = (await getPosts()).map((p) => ({
      url: `${SITE.origin}${localize(`/blog/${p.slug}`, postLang(p))}`,
      lastModified: p.updatedAt,
    }))
  } catch {}
  return [...pages, ...posts]
}
