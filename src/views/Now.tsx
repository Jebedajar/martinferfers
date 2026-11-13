import config from '@payload-config'
import { getPayload } from 'payload'
import { PostContent } from '@/components/PostContent'

export async function NowView() {
  const payload = await getPayload({ config })
  const page = await payload.findGlobal({ slug: 'now-page', depth: 1 })
  return (
    <article className="wrap page post now" lang="en">
      <header className="post-header">
        <h1>{page.title}</h1>
      </header>
      <PostContent data={page.content} />
    </article>
  )
}
