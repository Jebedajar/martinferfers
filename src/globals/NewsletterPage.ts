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
      'Texte der Seite „Inspiration Newsletter“. Die Anmeldeformulare stehen fest auf der Seite.',
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
            { name: 'titleDe', label: 'Überschrift', type: 'text' },
            { name: 'sublineDe', label: 'Unterzeile', type: 'text' },
            { name: 'contentDe', label: 'Text zwischen den Anmeldeformularen', type: 'richText', editor },
            { name: 'joinHeadingDe', label: 'Satz über dem zweiten Formular', type: 'text' },
            { name: 'bioDe', label: 'Absatz über mich (ganz unten)', type: 'richText', editor },
            { name: 'confirmedHeadingDe', label: 'Hinweis nach bestätigter Anmeldung: Überschrift', type: 'text' },
            { name: 'confirmedTextDe', label: 'Hinweis nach bestätigter Anmeldung: Text', type: 'text' },
          ],
        },
        {
          label: 'Englisch (/en/newsletter)',
          fields: [
            { name: 'titleEn', label: 'Headline', type: 'text' },
            { name: 'sublineEn', label: 'Subline', type: 'text' },
            { name: 'contentEn', label: 'Text between the sign-up forms', type: 'richText', editor },
            { name: 'joinHeadingEn', label: 'Line above the second form', type: 'text' },
            { name: 'bioEn', label: 'About me paragraph (bottom)', type: 'richText', editor },
            { name: 'confirmedHeadingEn', label: 'Notice after confirmed sign-up: heading', type: 'text' },
            { name: 'confirmedTextEn', label: 'Notice after confirmed sign-up: text', type: 'text' },
          ],
        },
      ],
    },
  ],
}
