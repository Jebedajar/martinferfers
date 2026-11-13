import type { Metadata } from 'next'
import Link from 'next/link'
import { draftMode } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { Banner } from '@/components/Banner'
import { Lines } from '@/components/Inline'
import { PostContent } from '@/components/PostContent'
import { BLOG, UI } from '@/content/site'
import { formatDate, localize, other, type Lang } from '@/lib/i18n'
import { getPost, getPosts, getTranslation, postLang, translatedIds } from '@/lib/posts'
import type { Post } from '@/payload-types'

const postHref = (post: Pick<Post, 'slug' | 'language'>) => localize(`/blog/${post.slug}`, postLang(post))

function PostItem({ post, lang, badge }: { post: Post; lang: Lang; badge?: string }) {
  const href = postHref(post)
  return (
    <article className="post-item" lang={postLang(post)}>
      <p className="post-meta">
        {post.authorName || 'Martin Ferfers'} <span aria-hidden="true">*</span>{' '}
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, lang)}</time>
        {badge && <em className="post-badge">{badge}</em>}
      </p>
      <h2>
        <Link href={href}>{post.title}</Link>
      </h2>
      {post.excerpt && <p className="post-excerpt">{post.excerpt}</p>}
      <Link className="read-more" href={href}>
        {UI[lang].readMore}
      </Link>
    </article>
  )
}

export async function BlogListView({ lang }: { lang: Lang }) {
  const ui = UI[lang]
  const posts = await getPosts()
  const own = posts.filter((p) => postLang(p) === lang)
  const translated = translatedIds(posts)
  // Posts that only exist in the other language
  const others = posts.filter((p) => postLang(p) !== lang && !translated.has(p.id))
  return (
    <>
      <Banner image={BLOG.image} size="small">
        <h1 className="banner-title">
          <Lines lines={BLOG.lines[lang]} lang={lang} />
        </h1>
      </Banner>
      <div className="wrap page blog-list">
        {own.length === 0 && <p className="empty">{ui.noPosts}</p>}
        {own.map((post) => (
          <PostItem key={post.id} post={post} lang={lang} />
        ))}
        {others.length > 0 && (
          <section className="blog-other">
            <h2 className="blog-other-head">{ui.otherLangPosts}</h2>
            {others.map((post) => (
              <PostItem key={post.id} post={post} lang={lang} badge={ui.inOtherLang} />
            ))}
          </section>
        )}
      </div>
    </>
  )
}

type Params = Promise<{ slug: string[] }>
const slugOf = async (params: Params) => (await params).slug.map(decodeURIComponent).join('/')

export async function postMetadata(params: Params): Promise<Metadata> {
  const post = await getPost(await slugOf(params))
  if (!post) return { title: 'Blog' }
  const translation = await getTranslation(post)
  const lang = postLang(post)
  return {
    title: post.title,
    description: post.excerpt || undefined,
    alternates: {
      canonical: postHref(post),
      languages: translation ? { [lang]: postHref(post), [other(lang)]: postHref(translation) } : undefined,
    },
    openGraph: { type: 'article', title: post.title, description: post.excerpt || undefined },
  }
}

/**
 * A post lives under the prefix of its own language. If it is opened under the other
 * language (e.g. via the language switch), we jump to its translation or to that blog.
 */
export async function PostView({ lang, params }: { lang: Lang; params: Params }) {
  const { isEnabled: draft } = await draftMode()
  const post = await getPost(await slugOf(params), draft)
  if (!post) notFound()
  const translation = await getTranslation(post, draft)
  if (postLang(post) !== lang) {
    if (translation && postLang(translation) === lang) redirect(postHref(translation))
    redirect(localize('/blog', lang))
  }
  const ui = UI[lang]
  const cover = typeof post.cover === 'object' && post.cover?.url ? post.cover : null
  return (
    <article className="wrap page post">
      <header className="post-header">
        <p className="post-meta">
          {post.authorName || 'Martin Ferfers'} <span aria-hidden="true">*</span>{' '}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, lang)}</time>
        </p>
        <h1>{post.title}</h1>
        {translation && (
          <p className="post-translation">
            <a href={postHref(translation)} hrefLang={other(lang)}>
              {ui.translationAvailable} →
            </a>
          </p>
        )}
      </header>
      {cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="post-cover" src={cover.url!} alt={cover.alt} />
      )}
      <PostContent data={post.content} />
      <footer className="post-footer">
        <Link href={localize('/blog', lang)}>{ui.backToBlog}</Link>
      </footer>
    </article>
  )
}
