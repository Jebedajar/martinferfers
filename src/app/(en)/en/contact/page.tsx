import { ContactView } from '@/views/Contact'

export const metadata = { title: 'Contact', alternates: { languages: { de: '/contact', en: '/en/contact' } } }

export default function Page() {
  return <ContactView lang="en" />
}
