import { AboutView } from '@/views/About'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'About', alternates: { languages: { de: '/about', en: '/en/about' } } }

export default function Page() {
  return <AboutView lang="en" />
}
