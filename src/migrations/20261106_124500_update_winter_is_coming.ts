import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-d1-sqlite'
import content from './data/winter-is-coming.json'

/** "Winter is coming": hero image, square Uniqlo image, product groups. Keeps it a draft. */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const existing = await payload.find({
    collection: 'posts',
    where: { slug: { equals: 'winter-is-coming' } },
    limit: 1,
    draft: true,
    req,
  })
  const post = existing.docs[0]
  if (!post) return
  await payload.update({
    collection: 'posts',
    id: post.id,
    draft: true,
    req,
    data: { content: content as any },
  })
  payload.logger.info('Updated draft post: Winter is coming')
}

export async function down(_args: MigrateDownArgs): Promise<void> {}
