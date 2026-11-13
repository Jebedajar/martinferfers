import { ImpressumView } from '@/views/Impressum'

export const metadata = { title: 'Imprint', alternates: { languages: { de: '/impressum', en: '/en/impressum' } } }

export default function Page() {
  return <ImpressumView lang="en" />
}
