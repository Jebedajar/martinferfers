import { HomeView } from '@/views/Home'

export const metadata = { alternates: { canonical: '/en', languages: { de: '/', en: '/en' } } }

export default function Page() {
  return <HomeView lang="en" />
}
