/**
 * Converts the cleaned Squarespace HTML (scripts/legacy/posts-source.json)
 * into Payload Lexical rich text (src/migrations/data/legacy-posts.json).
 *
 * Only needed if you change posts-source.json:
 *   pnpm payload run scripts/convert-legacy-posts.ts
 */
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'
import { convertHTMLToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import configPromise from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const SOURCE = path.join(dirname, 'legacy/posts-source.json')
const TARGET = path.join(dirname, '../src/migrations/data/legacy-posts.json')

type SourcePost = {
  slug: string
  title: string
  publishedAt: string
  excerpt: string
  sourceUrl: string
  html: string
}

const objectId = () => crypto.randomBytes(12).toString('hex')

function localizeLinks(html: string) {
  // Links to the own site become relative so they keep working after the move
  return html.replace(/href="https?:\/\/(www\.)?spark-innovation\.de(\/[^"]*)?"/g, (_m, _w, p) => `href="${p || '/'}"`)
}

async function main() {
  const config = await configPromise
  const editorConfig = await editorConfigFactory.default({ config })
  const toLexical = (html: string) => convertHTMLToLexical({ editorConfig, html, JSDOM })

  const convertBody = (html: string) => {
    const { document } = new JSDOM(`<body>${html}</body>`).window
    const children: any[] = []
    let buffer = ''
    const flush = () => {
      if (buffer.trim()) children.push(...toLexical(buffer).root.children)
      buffer = ''
    }
    for (const node of Array.from(document.body.childNodes) as any[]) {
      if (node.nodeType === 1 && node.tagName === 'FIGURE' && node.dataset.legacyImage) {
        flush()
        children.push({
          type: 'block',
          version: 2,
          format: '',
          fields: {
            id: objectId(),
            blockName: '',
            blockType: 'legacyImage',
            src: node.dataset.legacyImage,
            alt: node.dataset.legacyAlt || '',
            caption: node.dataset.legacyCaption || '',
          },
        })
      } else if (node.nodeType === 1 && node.tagName === 'DETAILS') {
        flush()
        const summary = node.querySelector('summary')
        const title = summary?.textContent?.trim() || ''
        summary?.remove()
        children.push({
          type: 'block',
          version: 2,
          format: '',
          fields: {
            id: objectId(),
            blockName: '',
            blockType: 'accordion',
            title,
            body: toLexical(node.innerHTML),
          },
        })
      } else {
        buffer += node.nodeType === 1 ? node.outerHTML : node.textContent
      }
    }
    flush()
    return {
      root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children },
    }
  }

  const posts: SourcePost[] = JSON.parse(fs.readFileSync(SOURCE, 'utf8'))
  // Same-day posts keep the original order (newer first) via a few minutes offset
  const out = posts.map((p, i) => ({
    title: p.title,
    slug: p.slug,
    publishedAt: new Date(Date.parse(`${p.publishedAt}T10:00:00.000Z`) - i * 60_000).toISOString(),
    excerpt: p.excerpt,
    sourceUrl: p.sourceUrl,
    authorName: 'Martin Ferfers',
    content: convertBody(localizeLinks(p.html)),
  }))
  fs.mkdirSync(path.dirname(TARGET), { recursive: true })
  fs.writeFileSync(TARGET, JSON.stringify(out, null, 1))

  // The /now page (transcribed from the old site)
  const nowHtml = fs.readFileSync(path.join(dirname, 'legacy/now-page.html'), 'utf8')
  fs.writeFileSync(
    path.join(path.dirname(TARGET), 'now-page.json'),
    JSON.stringify({ title: 'What I´m doing now', content: toLexical(nowHtml.trim()) }, null, 1),
  )
  for (const p of out) console.log(`${p.content.root.children.length.toString().padStart(4)} nodes  ${p.slug}`)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
