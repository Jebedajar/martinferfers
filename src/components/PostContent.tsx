import { RichText, type JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { AccordionBlock, LegacyImageBlock, ProductGroupBlock } from '@/payload-types'

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    legacyImage: ({ node }: { node: { fields: LegacyImageBlock } }) => {
      const { src, alt, caption, format } = node.fields
      return (
        <figure className={`post-figure post-figure-${format || 'original'}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt || caption || ''} loading={format === 'hero' ? 'eager' : 'lazy'} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      )
    },
    productGroup: ({ node }: { node: { fields: ProductGroupBlock } }) => {
      const items = node.fields.items || []
      return (
        <div className={`product-group product-group-${items.length}`}>
          {items.map((item, i) => (
            <div className="product" key={item.id || i}>
              {item.image && (
                <a className="product-image" href={item.url || undefined} target="_blank" rel="noopener noreferrer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.imageAlt || item.name} loading="lazy" />
                </a>
              )}
              {item.imageCredit && <p className="product-credit">{item.imageCredit}</p>}
              <h3 className="product-name">{item.name}</h3>
              {item.text?.split(/\n{2,}/).map((para, j) => <p key={j}>{para}</p>)}
              {item.price && <p className="product-price">{item.price}</p>}
              {item.url && (
                <a className="product-link" href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.linkLabel || 'Zum Produkt'}
                </a>
              )}
            </div>
          ))}
        </div>
      )
    },
    accordion: ({ node }: { node: { fields: AccordionBlock } }) => (
      <details className="post-accordion">
        <summary>{node.fields.title}</summary>
        {node.fields.body && (
          <div className="post-accordion-body">
            <RichText data={node.fields.body as SerializedEditorState} converters={converters} disableContainer />
          </div>
        )}
      </details>
    ),
  },
})

export function PostContent({ data }: { data: unknown }) {
  if (!data) return null
  return <RichText className="prose" data={data as SerializedEditorState} converters={converters} />
}
