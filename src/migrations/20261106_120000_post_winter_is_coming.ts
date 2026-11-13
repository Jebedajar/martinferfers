import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-d1-sqlite'
import content from './data/winter-is-coming.json'

/** New blog post "Winter is coming" – created as a DRAFT to review and publish in the CMS. */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const existing = await payload.find({
    collection: 'posts',
    where: { slug: { equals: 'winter-is-coming' } },
    limit: 1,
    draft: true,
    req,
  })
  if (existing.totalDocs) return
  await payload.create({
    collection: 'posts',
    draft: true,
    req,
    data: {
      title: 'Winter is coming',
      slug: 'winter-is-coming',
      publishedAt: '2026-11-06T11:00:00.000Z',
      authorName: 'Martin Ferfers',
      excerpt:
        'Ein Themenkomplex, den Ihr nun als gelöst ansehen könnt: Warm im Winter bleiben. Spoiler: Wolle is the answer! Meine größten Rechercheerfolge – von der Kaschmir-Mütze bis zur Alpaka-Decke.',
      content: content as any,
      _status: 'draft',
    },
  })
  payload.logger.info('Created draft post: Winter is coming')
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.delete({ collection: 'posts', where: { slug: { equals: 'winter-is-coming' } }, req })
}
