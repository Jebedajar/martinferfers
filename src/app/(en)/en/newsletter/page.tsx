import { NewsletterView } from '@/views/Newsletter'

export const metadata = {
  title: 'Inspiration Newsletter',
  alternates: { languages: { de: '/newsletter', en: '/en/newsletter' } },
}

export default async function Page({ searchParams }: { searchParams: Promise<{ confirmed?: string }> }) {
  const { confirmed } = await searchParams
  return <NewsletterView lang="en" confirmed={confirmed === '1'} />
}
