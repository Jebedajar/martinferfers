import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-d1-sqlite'
import content from './data/ai-is-coming.json'

/** "AI is coming": adds the ChatGPT privacy screenshot. Keeps it a draft. */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const existing = await payload.find({
    collection: 'posts',
    where: { slug: { equals: 'ai-is-coming' } },
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
  payload.logger.info('Updated draft post: AI is coming')
}

export async function down(_args: MigrateDownArgs): Promise<void> {}
