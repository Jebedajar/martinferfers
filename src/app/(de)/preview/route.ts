import config from '@payload-config'
import { draftMode, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { localize } from '@/lib/i18n'

/** Opened from the CMS "Preview" button: shows unpublished drafts to logged-in editors. */
export async function GET(request: Request) {
  const url = new URL(request.url)
  const slug = url.searchParams.get('slug') || ''
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  if (!user) return new Response('Please log in to the CMS first.', { status: 401 })
  const found = await payload.find({ collection: 'posts', where: { slug: { equals: slug } }, draft: true, limit: 1, depth: 0 })
  const lang = found.docs[0]?.language === 'en' ? 'en' : 'de'
  ;(await draftMode()).enable()
  redirect(localize(`/blog/${slug}`, lang))
}
