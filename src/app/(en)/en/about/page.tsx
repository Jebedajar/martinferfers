import { pageMeta } from '@/lib/meta'
import { AboutView } from '@/views/About'

export const dynamic = 'force-dynamic'

export const metadata = pageMeta('about', 'en', '/about')

export default function Page() {
  return <AboutView lang="en" />
}
