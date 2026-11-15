import { pageMeta } from '@/lib/meta'
import { ImpressumView } from '@/views/Impressum'

export const metadata = pageMeta('impressum', 'en', '/impressum')

export default function Page() {
  return <ImpressumView lang="en" />
}
