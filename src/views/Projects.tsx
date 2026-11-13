import { PROJECTS_PAGE, SPARKS } from '@/content/site'
import type { Lang } from '@/lib/i18n'

export function ProjectsView({ lang }: { lang: Lang }) {
  return (
    <div className="wrap page sparks">
      <h1 className="visually-hidden">{PROJECTS_PAGE[lang].title}</h1>
      {SPARKS.map((group) => (
        <section className="spark-group" key={group.name.en}>
          <header className="spark-group-head">
            <h2>{group.name[lang]}</h2>
            <p>{group.era[lang]}</p>
          </header>
          <ul className="spark-grid">
            {group.items.map((item, i) => {
              const logo = (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`/images/sparks/${item.logo.includes('.') ? item.logo : `${item.logo}.webp`}`} alt={item.alt} loading="lazy" />
              )
              return (
                <li className="spark" key={`${item.title.en}-${i}`}>
                  <div className="spark-logo">
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        {logo}
                      </a>
                    ) : (
                      logo
                    )}
                  </div>
                  <p className="spark-title">{item.title[lang]}</p>
                  {item.role && <p className="spark-role">{item.role[lang]}</p>}
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </div>
  )
}
