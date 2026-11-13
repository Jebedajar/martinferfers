import { PostView, postMetadata } from '@/views/Blog'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ slug: string[] }> }

export const generateMetadata = ({ params }: Props) => postMetadata(params)

export default function Page({ params }: Props) {
  return <PostView lang="en" params={params} />
}
