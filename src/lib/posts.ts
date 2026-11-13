import config from '@payload-config'
import { getPayload } from 'payload'
import type { Post } from '@/payload-types'
import type { Lang } from '@/lib/i18n'

export async function getPosts(): Promise<Post[]> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 500,
    depth: 0,
    overrideAccess: false,
  })
  return result.docs
}

export async function getPost(slug: string, draft = false): Promise<Post | null> {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'posts',
    where: draft ? { slug: { equals: slug } } : { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
    limit: 1,
    depth: 2,
    draft,
    overrideAccess: draft,
  })
  return result.docs[0] ?? null
}

export const postLang = (post: Pick<Post, 'language'>): Lang => (post.language === 'en' ? 'en' : 'de')

/** The linked translation of a post (the link can be set on either of the two posts). */
export async function getTranslation(post: Post, draft = false): Promise<Post | null> {
  if (post.translation && typeof post.translation === 'object') {
    if (draft || post.translation._status === 'published') return post.translation
  }
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'posts',
    where: draft
      ? { translation: { equals: post.id } }
      : { and: [{ translation: { equals: post.id } }, { _status: { equals: 'published' } }] },
    limit: 1,
    depth: 0,
    draft,
    overrideAccess: draft,
  })
  return result.docs[0] ?? null
}

/** IDs of all posts that have a translation (in either direction) */
export function translatedIds(posts: Post[]) {
  const ids = new Set<number>()
  for (const p of posts) {
    const tid = typeof p.translation === 'object' ? p.translation?.id : p.translation
    if (tid) {
      ids.add(p.id)
      ids.add(tid)
    }
  }
  return ids
}
