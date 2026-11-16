import { Lines } from '@/components/Inline'
import { PRIVACY } from '@/content/privacy'
import type { Lang } from '@/lib/i18n'

export function PrivacyView({ lang }: { lang: Lang }) {
  const p = PRIVACY[lang]
  return (
    <div className="wrap page legal" lang={lang}>
      <h1>{p.title}</h1>
      <p>{p.intro}</p>
      {p.sections.map((s) => (
        <section key={s.heading}>
          <h2>{s.heading}</h2>
          {s.paragraphs.map((text, i) => (
            <p key={i}>
              <Lines lines={text.split('\n')} lang={lang} />
            </p>
          ))}
        </section>
      ))}
      <p>
        <em>{p.updated}</em>
      </p>
    </div>
  )
}
