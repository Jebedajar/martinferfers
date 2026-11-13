import type { GlobalConfig } from 'payload'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

const editor = lexicalEditor({ features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()] })

/** Texts of the Inspiration Newsletter page (/newsletter and /en/newsletter). */
export const NewsletterPage: GlobalConfig = {
  slug: 'newsletter-page',
  label: 'Newsletter-Seite',
  admin: {
    group: 'Inhalte',
    description:
      'Texte der Seite „Inspiration Newsletter“. Überschrift und Anmeldeformulare stehen fest auf der Seite; hier pflegst du den Text dazwischen und den Absatz über dich am Ende.',
  },
  access: { read: () => true },
  versions: { drafts: true, max: 25 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Deutsch (/newsletter)',
          fields: [
            { name: 'contentDe', label: 'Text zwischen den Anmeldeformularen', type: 'richText', editor },
            { name: 'bioDe', label: 'Absatz über mich (ganz unten)', type: 'richText', editor },
          ],
        },
        {
          label: 'Englisch (/en/newsletter)',
          fields: [
            { name: 'contentEn', label: 'Text between the sign-up forms', type: 'richText', editor },
            { name: 'bioEn', label: 'About me paragraph (bottom)', type: 'richText', editor },
          ],
        },
      ],
    },
  ],
}
