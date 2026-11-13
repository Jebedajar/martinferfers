import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

/** Aufklappbarer Abschnitt („Klick zum Anzeigen“). */
export const Accordion: Block = {
  slug: 'accordion',
  labels: { singular: 'Aufklapp-Abschnitt', plural: 'Aufklapp-Abschnitte' },
  interfaceName: 'AccordionBlock',
  fields: [
    { name: 'title', label: 'Titel', type: 'text', required: true },
    { name: 'body', label: 'Inhalt', type: 'richText', editor: lexicalEditor() },
  ],
}
