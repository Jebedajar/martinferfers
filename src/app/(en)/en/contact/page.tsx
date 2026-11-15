import { pageMeta } from '@/lib/meta'
import { ContactView } from '@/views/Contact'

export const metadata = pageMeta('contact', 'en', '/contact')

export default function Page() {
  return <ContactView lang="en" />
}
