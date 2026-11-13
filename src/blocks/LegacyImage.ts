import type { Block } from 'payload'

/** Bild per URL – für importierte Altbeiträge oder extern gehostete Grafiken. */
export const LegacyImage: Block = {
  slug: 'legacyImage',
  labels: { singular: 'Bild (URL)', plural: 'Bilder (URL)' },
  interfaceName: 'LegacyImageBlock',
  fields: [
    {
      name: 'src',
      label: 'Bild-URL',
      type: 'text',
      required: true,
      admin: { description: 'Für neue Bilder lieber den Upload-Button in der Werkzeugleiste nutzen.' },
    },
    { name: 'alt', label: 'Alternativtext', type: 'text' },
    { name: 'caption', label: 'Bildunterschrift', type: 'text' },
    {
      name: 'format',
      label: 'Format',
      type: 'select',
      defaultValue: 'original',
      options: [
        { label: 'Original', value: 'original' },
        { label: 'Quadratisch zugeschnitten', value: 'square' },
        { label: 'Breit (Titelbild)', value: 'hero' },
      ],
    },
  ],
}
