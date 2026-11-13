import type { GlobalConfig } from 'payload'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

/** The /now page ("What I´m doing now"), editable in the CMS. */
export const NowPage: GlobalConfig = {
  slug: 'now-page',
  label: '/now-Seite',
  admin: { group: 'Inhalte', description: 'Die Seite „What I´m doing now“ unter /now.' },
  access: { read: () => true },
  versions: { drafts: true, max: 25 },
  fields: [
    { name: 'title', label: 'Überschrift', type: 'text', required: true, defaultValue: 'What I´m doing now' },
    {
      name: 'content',
      label: 'Inhalt',
      type: 'richText',
      editor: lexicalEditor({ features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()] }),
    },
  ],
}
