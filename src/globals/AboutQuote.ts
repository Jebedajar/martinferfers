import type { GlobalConfig } from 'payload'

/** The quote under "And Remember:" on the About page. */
export const AboutQuote: GlobalConfig = {
  slug: 'about-quote',
  label: 'About-Seite: Zitat',
  admin: { group: 'Inhalte', description: 'Zitat unter „And Remember:“ auf der About-Seite. Leer lassen = kein Zitat.' },
  access: { read: () => true },
  fields: [
    { name: 'quote', label: 'Zitat', type: 'textarea' },
    { name: 'author', label: 'Autor', type: 'text', defaultValue: 'Bruce Springsteen' },
  ],
}
