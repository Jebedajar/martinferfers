import { Banner } from '@/components/Banner'
import { ContactForm, KitForm } from '@/components/Forms'
import { CONTACT } from '@/content/site'
import type { Lang } from '@/lib/i18n'

export function ContactView({ lang }: { lang: Lang }) {
  const c = CONTACT[lang]
  return (
    <>
      <Banner image={CONTACT.image} size="small">
        <h1 className="banner-title">{c.greeting}</h1>
      </Banner>
      <div className="wrap page contact">
        <section>
          <h2>{c.message.heading}</h2>
          <p>{c.message.text}</p>
          <ContactForm lang={lang} />
        </section>
        <section id="newsletter">
          <h2>{c.list.heading}</h2>
          <p>{c.list.text}</p>
          <KitForm lang={lang} />
        </section>
      </div>
    </>
  )
}
