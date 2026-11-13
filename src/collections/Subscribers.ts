import type { CollectionConfig } from 'payload'

/** Anmeldungen für die E-Mail-Liste („Stay in Touch“). */
export const Subscribers: CollectionConfig = {
  slug: 'subscribers',
  labels: { singular: 'Abonnent', plural: 'E-Mail-Liste' },
  // Not used any more: newsletter sign-ups now go to Kit (kit.com). Kept so the database schema stays the same.
  admin: { group: 'Kontakt', useAsTitle: 'email', defaultColumns: ['email', 'name', 'createdAt'], hidden: true },
  access: {
    create: ({ req }) => Boolean(req.user),
    read: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'email', label: 'E-Mail', type: 'email', required: true, unique: true },
    { name: 'name', type: 'text' },
  ],
}
