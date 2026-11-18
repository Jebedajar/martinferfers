import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-d1-sqlite'

/**
 * "AI is coming": inserts the Grok model-menu screenshot below the Grok model-selection bullet.
 * Reads the CURRENT draft (incl. edits made in the CMS) and only adds the one image block – nothing else changes.
 */
type Node = { type?: string; text?: string; children?: Node[]; fields?: Record<string, unknown> }
const text = (n: Node): string => n.text ?? (n.children || []).map(text).join('')

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  const found = await payload.find({
    collection: 'posts',
    where: { slug: { equals: 'ai-is-coming' } },
    limit: 1,
    draft: true,
    depth: 0,
    req,
  })
  const post = found.docs[0] as any
  if (!post?.content?.root?.children) return
  const children: Node[] = post.content.root.children
  if (JSON.stringify(children).includes('ai-is-coming-modell-grok')) return
  const i = children.findIndex((c) => c.type === 'list' && text(c).startsWith('Grok:') && text(c).includes('Modellmenü'))
  if (i < 0) {
    payload.logger.info('AI is coming: Grok model bullet not found – image not inserted')
    return
  }
  children.splice(i + 1, 0, {
    type: 'block',
    version: 2,
    format: '',
    fields: {
      id: 'a1c0de5grok0model0img001',
      blockName: '',
      blockType: 'legacyImage',
      src: '/images/blog/ai-is-coming-modell-grok.png',
      alt: 'Grok: Modellmenü mit Auto, Schnell, Experte, Build und Schwer',
      caption: 'Bild: Grok',
      format: 'original',
    },
  } as any)
  await payload.update({
    collection: 'posts',
    id: post.id,
    draft: true,
    req,
    data: { content: post.content },
  })
  payload.logger.info('AI is coming: Grok model screenshot inserted')
}

export async function down(_args: MigrateDownArgs): Promise<void> {}
