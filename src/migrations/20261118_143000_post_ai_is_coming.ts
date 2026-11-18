import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-d1-sqlite'
import content from './data/ai-is-coming.json'

/** New blog post "AI is coming" – created as a DRAFT to review and publish in the CMS. */
export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const existing = await payload.find({
    collection: 'posts',
    where: { slug: { equals: 'ai-is-coming' } },
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
      title: 'AI is coming. Wie Du sofort mehr aus Deinen KI-Tools rausholst.',
      slug: 'ai-is-coming',
      language: 'de',
      publishedAt: '2026-11-18T12:00:00.000Z',
      authorName: 'Martin Ferfers',
      excerpt:
        'Manche spielen KI-Tools immer noch runter. Hier 2-3 kleine Stupser zu Deinen eigenen KI-WOW-Momenten: bezahlte Versionen, der richtige Modus, Geld sparen, KI machen lassen – plus ein Wort zu Daten- und Hirnschutz.',
      content: content as any,
      _status: 'draft',
    },
  })
  payload.logger.info('Created draft post: AI is coming')
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.delete({ collection: 'posts', where: { slug: { equals: 'ai-is-coming' } }, req })
}
