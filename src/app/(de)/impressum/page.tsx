import { ImpressumView } from '@/views/Impressum'

export const metadata = { title: 'Impressum', alternates: { languages: { de: '/impressum', en: '/en/impressum' } } }

export default function Page() {
  return <ImpressumView lang="de" />
}
