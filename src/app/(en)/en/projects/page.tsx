import { pageMeta } from '@/lib/meta'
import { ProjectsView } from '@/views/Projects'

export const metadata = pageMeta('projects', 'en', '/projects')

export default function Page() {
  return <ProjectsView lang="en" />
}
