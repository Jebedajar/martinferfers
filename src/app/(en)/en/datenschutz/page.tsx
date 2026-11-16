import { pageMeta } from '@/lib/meta'
import { PrivacyView } from '@/views/Privacy'

export const metadata = pageMeta('datenschutz', 'en', '/datenschutz')

export default function Page() {
  return <PrivacyView lang="en" />
}
