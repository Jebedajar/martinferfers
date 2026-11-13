import { ProjectsView } from '@/views/Projects'

export const metadata = { title: 'Projects', alternates: { canonical: '/en/projects', languages: { de: '/projects', en: '/en/projects' } } }

export default function Page() {
  return <ProjectsView lang="en" />
}
