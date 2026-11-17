import { redirect } from 'next/navigation'
import { pageMeta } from '@/lib/meta'
import { NewsletterView } from '@/views/Newsletter'

export const dynamic = 'force-dynamic'

export const metadata = pageMeta('newsletter', 'en', '/newsletter')

export default async function Page({ searchParams }: { searchParams: Promise<{ confirmed?: string }> }) {
  const { confirmed } = await searchParams
  // Kit sends people here after they confirm their subscription → thank-you page
  if (confirmed === '1') redirect('/en/awesome')
  return <NewsletterView lang="en" confirmed={confirmed === '1'} />
}
