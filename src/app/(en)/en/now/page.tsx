import { NowView } from '@/views/Now'

export const dynamic = 'force-dynamic'

export const metadata = { title: 'Now', alternates: { canonical: '/en/now', languages: { de: '/now', en: '/en/now' } } }

export default function Page() {
  return <NowView />
}
