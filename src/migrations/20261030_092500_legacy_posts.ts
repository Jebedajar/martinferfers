import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-d1-sqlite'
import legacyPosts from './data/legacy-posts.json'

/**
 * Imports the 8 original blog posts from www.spark-innovation.de (Squarespace)
 * into the CMS. Posts that already exist (same URL path) are left untouched.
 */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  for (const post of legacyPosts as any[]) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
      draft: true,
      req,
    })
    if (existing.totalDocs) continue
    await payload.create({
      collection: 'posts',
      data: { ...post, _status: 'published' },
      draft: false,
      req,
    })
    payload.logger.info(`Imported blog post: ${post.title}`)
  }
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  for (const post of legacyPosts as any[]) {
    await payload.delete({ collection: 'posts', where: { slug: { equals: post.slug } }, req })
  }
}
