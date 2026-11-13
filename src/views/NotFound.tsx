import Link from 'next/link'
import { UI } from '@/content/site'
import { localize, type Lang } from '@/lib/i18n'

export function NotFoundView({ lang }: { lang: Lang }) {
  const ui = UI[lang]
  return (
    <div className="wrap page legal">
      <h1>{ui.notFoundTitle}</h1>
      <p>{ui.notFoundText}</p>
      <p>
        <Link className="button" href={localize('/', lang)}>
          {ui.notFoundCta}
        </Link>
      </p>
    </div>
  )
}
