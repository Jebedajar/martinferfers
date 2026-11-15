import { pageMeta } from '@/lib/meta'
import { BlogListView } from '@/views/Blog'

export const dynamic = 'force-dynamic'

export const metadata = pageMeta('blog', 'en', '/blog')

export default function Page() {
  return <BlogListView lang="en" />
}
