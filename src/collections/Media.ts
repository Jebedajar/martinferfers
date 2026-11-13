import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Bild', plural: 'Medien' },
  admin: { group: 'Inhalte' },
  access: { read: () => true },
  fields: [{ name: 'alt', label: 'Alternativtext', type: 'text', required: true }],
  upload: {
    // Not supported on Cloudflare Workers (no sharp)
    crop: false,
    focalPoint: false,
    mimeTypes: ['image/*'],
  },
}
