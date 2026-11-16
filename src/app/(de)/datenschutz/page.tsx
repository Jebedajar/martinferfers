import { pageMeta } from '@/lib/meta'
import { PrivacyView } from '@/views/Privacy'

export const metadata = pageMeta('datenschutz', 'de', '/datenschutz')

export default function Page() {
  return <PrivacyView lang="de" />
}
