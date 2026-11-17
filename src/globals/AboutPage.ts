import type { Field, GlobalConfig } from 'payload'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

const editor = lexicalEditor({ features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()] })

const lines = 'Jede Zeile wird eine eigene Zeile.'

const langFields = (s: 'De' | 'En'): Field[] => [
  { name: `mission${s}`, label: 'Mission (Überschrift)', type: 'textarea', admin: { description: lines } },
  { name: `twoWaysIntro${s}`, label: 'Satz vor den zwei Wegen', type: 'text' },
  { name: `ways${s}`, label: 'Die Wege', type: 'textarea', admin: { description: 'Ein Weg pro Zeile; die Nummern davor setzt die Seite.' } },
  { name: `projectsLink${s}`, label: 'Button zu den Projekten', type: 'text' },
  { name: `rememberHeading${s}`, label: 'Überschrift über dem Zitat', type: 'text' },
  { name: `contactLink${s}`, label: 'Button zum Kontakt', type: 'text' },
  { name: `bioHeading${s}`, label: 'Überschrift über dem Lebenslauf', type: 'textarea', admin: { description: lines } },
  {
    name: `bio${s}`,
    label: 'Lebenslauf',
    type: 'richText',
    editor,
    admin: { description: 'Als Aufzählung schreiben; jeder Punkt bekommt auf der Seite ein *-Sternchen.' },
  },
  { name: `nowLink${s}`, label: 'Link zur /now-Seite', type: 'text' },
]

/** Texts of the About page (/about and /en/about). */
export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'Über mich',
  admin: { group: 'Inhalte', description: 'Texte der Seite „Über mich / About“.' },
  access: { read: () => true },
  versions: { drafts: true, max: 25 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        { label: 'Deutsch (/about)', fields: langFields('De') },
        { label: 'Englisch (/en/about)', fields: langFields('En') },
        {
          label: 'Zitat',
          description: 'Gilt für beide Sprachen. Zitat leer lassen = kein Zitat-Abschnitt.',
          fields: [
            { name: 'quote', label: 'Zitat', type: 'textarea' },
            { name: 'quoteAuthor', label: 'Autor', type: 'text' },
          ],
        },
      ],
    },
  ],
}
