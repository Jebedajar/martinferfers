import { Fragment } from 'react'
import Link from 'next/link'
import { localize, type Lang } from '@/lib/i18n'

/** Resolves a link from content/site.ts: internal paths get the language prefix, "de:/x" / "en:/x" force a language. */
export function resolveHref(url: string, lang: Lang) {
  const fixed = url.match(/^(de|en):(\/.*)$/)
  if (fixed) return localize(fixed[2], fixed[1] as Lang)
  return localize(url, lang)
}

/** Renders a text with [label](url) links, as used in content/site.ts. */
export function Inline({ text, lang }: { text: string; lang: Lang }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g)
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
        if (!m) return <Fragment key={i}>{part}</Fragment>
        const href = resolveHref(m[2], lang)
        if (href.startsWith('/')) {
          return (
            <Link key={i} href={href}>
              {m[1]}
            </Link>
          )
        }
        const external = /^https?:/.test(href)
        return (
          <a key={i} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            {m[1]}
          </a>
        )
      })}
    </>
  )
}

export function Lines({ lines, lang }: { lines: string[]; lang: Lang }) {
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          <Inline text={line} lang={lang} />
        </Fragment>
      ))}
    </>
  )
}
