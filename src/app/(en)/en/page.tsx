import { pageMeta } from '@/lib/meta'
import { HomeView } from '@/views/Home'

export const metadata = pageMeta('home', 'en', '/')

export default function Page() {
  return <HomeView lang="en" />
}
