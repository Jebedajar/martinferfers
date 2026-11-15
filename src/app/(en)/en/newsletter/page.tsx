import { pageMeta } from '@/lib/meta'
import { NewsletterView } from '@/views/Newsletter'

export const dynamic = 'force-dynamic'

export const metadata = pageMeta('newsletter', 'en', '/newsletter')

export default async function Page({ searchParams }: { searchParams: Promise<{ confirmed?: string }> }) {
  const { confirmed } = await searchParams
  return <NewsletterView lang="en" confirmed={confirmed === '1'} />
}
