/**
 * One-off: converts the texts of home, about and newsletter page from src/content/site.ts
 * into the CMS format (Lexical JSON) for the migration 20261117_145937_home_about_newsletter_texts.
 * Run: pnpm exec tsx scripts/build-page-texts.ts
 */
import fs from 'fs'
import { ABOUT, HOME, NEWSLETTER } from '../src/content/site'
import { localize, type Lang } from '../src/lib/i18n'

const text = (t: string) => ({ detail: 0, format: 0, mode: 'normal', style: '', text: t, type: 'text', version: 1 })

function inline(src: string, lang: Lang) {
  const out: object[] = []
  for (const part of src.split(/(\[[^\]]+\]\([^)]+\))/g)) {
    if (!part) continue
    const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (!m) {
      out.push(text(part))
      continue
    }
    const fixed = m[2].match(/^(de|en):(\/.*)$/)
    const url = fixed ? localize(fixed[2], fixed[1] as Lang) : localize(m[2], lang)
    out.push({
      children: [text(m[1])],
      direction: 'ltr',
      format: '',
      indent: 0,
      type: 'link',
      version: 3,
      fields: { linkType: 'custom', newTab: /^https?:/.test(url), url },
    })
  }
  return out
}

const root = (children: object[]) => ({
  root: { children, direction: 'ltr', format: '', indent: 0, type: 'root', version: 1 },
})
const para = (src: string, lang: Lang) => ({
  children: inline(src, lang),
  direction: 'ltr',
  format: '',
  indent: 0,
  type: 'paragraph',
  version: 1,
  textFormat: 0,
  textStyle: '',
})
const bullets = (items: string[], lang: Lang) => ({
  children: items.map((item, i) => ({
    children: inline(item, lang),
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'listitem',
    version: 1,
    value: i + 1,
  })),
  direction: 'ltr',
  format: '',
  indent: 0,
  type: 'list',
  version: 1,
  listType: 'bullet',
  start: 1,
  tag: 'ul',
})

const out: Record<string, unknown> = {}
for (const lang of ['de', 'en'] as const) {
  const S = lang === 'de' ? 'De' : 'En'
  const h = HOME[lang]
  out[`hero${S}`] = h.hero.lines.join('\n')
  out[`intro${S}`] = root(h.blocks.filter((b) => !b.form).map((b) => para(b.text, lang)))
  out[`newsletter${S}`] = root(h.blocks.filter((b) => b.form).map((b) => para(b.text, lang)))

  const a = ABOUT[lang]
  out[`mission${S}`] = a.mission.join('\n')
  out[`twoWaysIntro${S}`] = a.twoWays.intro
  out[`ways${S}`] = a.twoWays.ways.join('\n')
  out[`projectsLink${S}`] = a.projectsLink
  out[`rememberHeading${S}`] = a.remember.heading
  out[`contactLink${S}`] = a.contactLink
  out[`bioHeading${S}`] = a.bio.heading.join('\n')
  out[`bio${S}`] = root([bullets(a.bio.items, lang)])
  out[`nowLink${S}`] = a.bio.now

  const n = NEWSLETTER[lang]
  out[`nlTitle${S}`] = n.title
  out[`nlSubline${S}`] = n.subline
  out[`nlJoinHeading${S}`] = n.joinHeading
  out[`nlConfirmedHeading${S}`] = n.confirmed.heading
  out[`nlConfirmedText${S}`] = n.confirmed.text
}
fs.writeFileSync('src/migrations/data/page-texts-2026-11.json', JSON.stringify(out, null, 2) + '\n')
console.log('written', Object.keys(out).length, 'fields')
