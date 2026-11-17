import config from '@payload-config'
import { getPayload } from 'payload'
import { PostContent } from '@/components/PostContent'
import type { Lang } from '@/lib/i18n'

export async function NowView({ lang }: { lang: Lang }) {
  const payload = await getPayload({ config })
  const page = await payload.findGlobal({ slug: 'now-page', depth: 1 })
  // German falls back to the English version if it is still empty
  const useDe = lang === 'de' && !!page.contentDe
  const title = useDe ? page.titleDe || 'Was ich gerade mache' : page.title
  const content = useDe ? page.contentDe : page.content
  return (
    <article className="wrap page post now" lang={useDe ? 'de' : 'en'}>
      <header className="post-header">
        <h1>{title}</h1>
      </header>
      <PostContent data={content} />
    </article>
  )
}
