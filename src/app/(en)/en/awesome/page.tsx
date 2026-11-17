import type { Metadata } from 'next'
import { AwesomeView } from '@/views/Awesome'

// Thank-you page after the newsletter confirmation – not for search engines
export const metadata: Metadata = {
  title: { absolute: 'Martin Ferfers – You´re awesome!' },
  robots: { index: false, follow: false },
}

export default function Page() {
  return <AwesomeView lang="en" />
}
