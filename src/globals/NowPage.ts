import type { GlobalConfig } from 'payload'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

const editor = lexicalEditor({ features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()] })

/** The /now page ("What I´m doing now"), editable in the CMS – German under /now, English under /en/now. */
export const NowPage: GlobalConfig = {
  slug: 'now-page',
  label: '/now-Seite',
  admin: { group: 'Inhalte', description: 'Die Seite „Was ich gerade mache / What I´m doing now“ unter /now und /en/now.' },
  access: { read: () => true },
  versions: { drafts: true, max: 25 },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Deutsch (/now)',
          fields: [
            { name: 'titleDe', label: 'Überschrift', type: 'text', defaultValue: 'Was ich gerade mache' },
            { name: 'contentDe', label: 'Inhalt', type: 'richText', editor },
          ],
        },
        {
          label: 'Englisch (/en/now)',
          fields: [
            { name: 'title', label: 'Headline', type: 'text', required: true, defaultValue: 'What I´m doing now' },
            { name: 'content', label: 'Content', type: 'richText', editor },
          ],
        },
      ],
    },
  ],
}
