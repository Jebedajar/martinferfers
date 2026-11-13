import { HomeView } from '@/views/Home'

export const metadata = { alternates: { languages: { de: '/', en: '/en' } } }

export default function Page() {
  return <HomeView lang="de" />
}
