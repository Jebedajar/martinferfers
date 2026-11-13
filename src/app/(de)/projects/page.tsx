import { ProjectsView } from '@/views/Projects'

export const metadata = { title: 'Projekte', alternates: { languages: { de: '/projects', en: '/en/projects' } } }

export default function Page() {
  return <ProjectsView lang="de" />
}
