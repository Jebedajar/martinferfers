import type { GlobalConfig } from 'payload'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

const editor = lexicalEditor({ features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()] })

const lines = 'Jede Zeile wird eine eigene Zeile im Banner.'

/** Texts of the home page (/ and /en). */
export const HomePage: GlobalConfig = {
  slug: 'home-page',
  label: 'Startseite',
  admin: {
    group: 'Inhalte',
    description:
      'Texte der Startseite. Jeder Absatz im Text bekommt automatisch ein *-Sternchen davor. Das Anmeldeformular steht fest unter dem Newsletter-Absatz.',
  },
  access: { read: () => true },
  versions: { drafts: true, max: 25 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Deutsch (/)',
          fields: [
            { name: 'heroDe', label: 'Begrüßung im Banner', type: 'textarea', admin: { description: lines } },
            { name: 'introDe', label: 'Text (Absätze)', type: 'richText', editor },
            { name: 'newsletterDe', label: 'Absatz vor dem Newsletter-Formular', type: 'richText', editor },
          ],
        },
        {
          label: 'Englisch (/en)',
          fields: [
            { name: 'heroEn', label: 'Greeting in the banner', type: 'textarea', admin: { description: lines } },
            { name: 'introEn', label: 'Text (paragraphs)', type: 'richText', editor },
            { name: 'newsletterEn', label: 'Paragraph above the newsletter form', type: 'richText', editor },
          ],
        },
      ],
    },
  ],
}
