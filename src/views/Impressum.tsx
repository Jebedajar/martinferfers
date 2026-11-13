import { Inline, Lines } from '@/components/Inline'
import { IMPRESSUM } from '@/content/site'
import type { Lang } from '@/lib/i18n'

export function ImpressumView({ lang }: { lang: Lang }) {
  return (
    <div className="wrap page legal" lang="de">
      <h1>Impressum</h1>
      <p>
        <strong>{IMPRESSUM.heading}</strong>
      </p>
      <p>
        <Lines lines={IMPRESSUM.address} lang={lang} />
      </p>
      <p>
        <Inline text={IMPRESSUM.credits} lang={lang} />
      </p>
    </div>
  )
}
