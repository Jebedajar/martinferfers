import { pageMeta } from '@/lib/meta'
import { NowView } from '@/views/Now'

export const dynamic = 'force-dynamic'

export const metadata = pageMeta('now', 'de', '/now')

export default function Page() {
  return <NowView />
}
