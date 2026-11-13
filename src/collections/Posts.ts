import type { CollectionConfig, FieldHook } from 'payload'
import { BlocksFeature, FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { LegacyImage } from '../blocks/LegacyImage'
import { Accordion } from '../blocks/Accordion'
import { ProductGroup } from '../blocks/ProductGroup'
import { slugify } from '../lib/slugify'

const formatSlug: FieldHook = ({ value, data, operation }) => {
  if (typeof value === 'string' && value.trim()) {
    return value.trim().replace(/^\/+|\/+$/g, '').replace(/^blog\//, '')
  }
  if (operation === 'create' && data?.title) return slugify(String(data.title))
  return value
}

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Blogbeitrag', plural: 'Blogbeiträge' },
  admin: {
    group: 'Inhalte',
    useAsTitle: 'title',
    defaultColumns: ['title', 'language', 'publishedAt', '_status', 'updatedAt'],
    description: 'Alle Blogbeiträge. Deutsche Beiträge erscheinen unter /blog, englische unter /en/blog. Änderungen werden erst nach „Veröffentlichen“ sichtbar.',
    preview: (doc) => (doc?.slug ? `/preview?slug=${encodeURIComponent(String(doc.slug))}` : null),
  },
  defaultSort: '-publishedAt',
  versions: { drafts: true, maxPerDoc: 25 },
  access: {
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
  },
  fields: [
    { name: 'title', label: 'Titel', type: 'text', required: true },
    {
      name: 'excerpt',
      label: 'Kurzbeschreibung',
      type: 'textarea',
      admin: { description: 'Erscheint in der Blog-Übersicht und als Beschreibung für Google.' },
    },
    {
      name: 'content',
      label: 'Inhalt',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          FixedToolbarFeature(),
          BlocksFeature({ blocks: [LegacyImage, ProductGroup, Accordion] }),
        ],
      }),
    },
    {
      name: 'slug',
      label: 'URL-Pfad',
      type: 'text',
      unique: true,
      index: true,
      hooks: { beforeValidate: [formatSlug] },
      admin: {
        position: 'sidebar',
        description: 'Teil nach /blog/. Leer lassen = wird aus dem Titel erzeugt. Bei Altbeiträgen nicht ändern (Google-Links).',
      },
    },
    {
      name: 'language',
      label: 'Sprache',
      type: 'select',
      required: true,
      defaultValue: 'de',
      options: [
        { label: 'Deutsch', value: 'de' },
        { label: 'Englisch', value: 'en' },
      ],
      index: true,
      admin: { position: 'sidebar', description: 'Deutsch → /blog/…, Englisch → /en/blog/…' },
    },
    {
      name: 'translation',
      label: 'Übersetzung',
      type: 'relationship',
      relationTo: 'posts',
      filterOptions: ({ data, id }) => ({
        and: [{ language: { not_equals: data?.language || 'de' } }, ...(id ? [{ id: { not_equals: id } }] : [])],
      }),
      admin: {
        position: 'sidebar',
        description: 'Derselbe Beitrag in der anderen Sprache (optional). Es reicht, die Verknüpfung bei einem der beiden Beiträge zu setzen.',
      },
    },
    {
      name: 'publishedAt',
      label: 'Datum',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly', displayFormat: 'd. MMMM yyyy' } },
    },
    {
      name: 'authorName',
      label: 'Autor',
      type: 'text',
      defaultValue: 'Martin Ferfers',
      admin: { position: 'sidebar' },
    },
    {
      name: 'cover',
      label: 'Titelbild',
      type: 'upload',
      relationTo: 'media',
      admin: { position: 'sidebar' },
    },
    {
      name: 'sourceUrl',
      label: 'Original-URL (Squarespace)',
      type: 'text',
      admin: { readOnly: true, position: 'sidebar', condition: (data) => Boolean(data?.sourceUrl) },
    },
  ],
}
