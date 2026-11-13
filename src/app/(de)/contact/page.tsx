import { ContactView } from '@/views/Contact'

export const metadata = { title: 'Kontakt', alternates: { languages: { de: '/contact', en: '/en/contact' } } }

export default function Page() {
  return <ContactView lang="de" />
}
