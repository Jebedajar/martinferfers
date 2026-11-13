import { ProjectsView } from '@/views/Projects'

export const metadata = { title: 'Projekte', alternates: { canonical: '/projects', languages: { de: '/projects', en: '/en/projects' } } }

export default function Page() {
  return <ProjectsView lang="de" />
}
