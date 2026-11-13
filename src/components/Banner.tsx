/** Full-width photo banner with text, like the Squarespace page banners. */
export function Banner({
  image,
  children,
  size = 'large',
}: {
  image: string
  children: React.ReactNode
  size?: 'large' | 'small'
}) {
  return (
    <section className={`banner banner-${size}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="banner-image" src={image} alt="" fetchPriority="high" />
      <div className="wrap banner-text">{children}</div>
    </section>
  )
}
