import { pageMeta } from '@/lib/meta'
import { ContactView } from '@/views/Contact'

export const metadata = pageMeta('contact', 'de', '/contact')

export default function Page() {
  return <ContactView lang="de" />
}
