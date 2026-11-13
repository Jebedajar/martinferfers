import type { Block } from 'payload'

/** Bis zu 3 Produkte nebeneinander: Bilder in einer Reihe, Texte darunter. */
export const ProductGroup: Block = {
  slug: 'productGroup',
  labels: { singular: 'Produktgruppe', plural: 'Produktgruppen' },
  interfaceName: 'ProductGroupBlock',
  fields: [
    {
      name: 'items',
      label: 'Produkte',
      type: 'array',
      minRows: 1,
      maxRows: 3,
      labels: { singular: 'Produkt', plural: 'Produkte' },
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'image', label: 'Bild-URL', type: 'text' },
        { name: 'imageAlt', label: 'Alternativtext', type: 'text' },
        { name: 'imageCredit', label: 'Bildquelle', type: 'text' },
        { name: 'text', label: 'Text', type: 'textarea' },
        { name: 'price', label: 'Preis', type: 'text' },
        { name: 'url', label: 'Link', type: 'text' },
        { name: 'linkLabel', label: 'Link-Text', type: 'text' },
      ],
    },
  ],
}
