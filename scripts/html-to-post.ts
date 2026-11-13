/**
 * Converts one HTML file (scripts/posts/<name>.html) into Payload Lexical JSON
 * for a seed migration: pnpm exec tsx scripts/html-to-post.ts <name>
 */
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'
import { convertHTMLToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import configPromise from '../src/payload.config'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const objectId = () => crypto.randomBytes(12).toString('hex')

async function main() {
  const name = process.argv[2]
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
            format: node.dataset.legacyFormat || 'original',
          },
        })
      } else if (node.nodeType === 1 && node.dataset?.block) {
        // Generic block: <div data-block="productGroup" data-json='{...}'></div>
        flush()
        const fields = JSON.parse(node.dataset.json || '{}')
        if (Array.isArray(fields.items)) fields.items = fields.items.map((it: any) => ({ id: objectId(), ...it }))
        children.push({
          type: 'block',
          version: 2,
          format: '',
          fields: { id: objectId(), blockName: '', blockType: node.dataset.block, ...fields },
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

  const html = fs.readFileSync(path.join(dirname, 'posts', `${name}.html`), 'utf8').replace(/\n/g, '')
  const out = path.join(dirname, '../src/migrations/data', `${name}.json`)
  fs.writeFileSync(out, JSON.stringify(convertBody(html), null, 1))
  console.log('written', out)
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
