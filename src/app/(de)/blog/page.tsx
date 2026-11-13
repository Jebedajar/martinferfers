import { BlogListView } from '@/views/Blog'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Blog', alternates: { canonical: '/blog', languages: { de: '/blog', en: '/en/blog' } } }

export default function Page() {
  return <BlogListView lang="de" />
}
