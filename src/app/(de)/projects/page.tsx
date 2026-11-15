import { pageMeta } from '@/lib/meta'
import { ProjectsView } from '@/views/Projects'

export const metadata = pageMeta('projects', 'de', '/projects')

export default function Page() {
  return <ProjectsView lang="de" />
}
