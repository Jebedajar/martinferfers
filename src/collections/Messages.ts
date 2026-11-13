import type { CollectionConfig } from 'payload'

/** Nachrichten aus dem Kontaktformular („Drop me a line“). */
export const Messages: CollectionConfig = {
  slug: 'messages',
  labels: { singular: 'Nachricht', plural: 'Nachrichten' },
  admin: { group: 'Kontakt', useAsTitle: 'name', defaultColumns: ['name', 'email', 'createdAt'] },
  access: {
    // Public submissions go through /api/contact (server side, with spam check)
    create: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', label: 'E-Mail', type: 'email', required: true },
    { name: 'message', label: 'Nachricht', type: 'textarea', required: true },
  ],
}
