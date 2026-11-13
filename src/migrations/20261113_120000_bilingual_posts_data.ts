import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

/** Sets the language of the existing blog posts and links translated posts. */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Existing posts: mark the English ones (all others stay German) ...
  for (const slug of EN_SLUGS) {
    await db.run(sql`UPDATE posts SET language = 'en' WHERE slug = ${slug};`)
    await db.run(sql`UPDATE _posts_v SET version_language = 'en' WHERE version_slug = ${slug};`)
  }
  // ... and link the ChatGPT → Claude article with its German version
  const [en, de] = TRANSLATION_PAIR
  await db.run(sql`UPDATE posts SET translation_id = (SELECT id FROM posts WHERE slug = ${de}) WHERE slug = ${en};`)
  await db.run(
    sql`UPDATE _posts_v SET version_translation_id = (SELECT id FROM posts WHERE slug = ${de}) WHERE version_slug = ${en};`,
  )
}

export async function down(_args: MigrateDownArgs): Promise<void> {}

const EN_SLUGS = [
  '2026/3/3/how-to-move-from-chatgpt-to-claude-without-losing-everything-it-knows-about-you',
  'a-guide-to-crypto-investing-for-lazy-people',
  'weak-strength',
  'hello',
]

const TRANSLATION_PAIR = [
  '2026/3/3/how-to-move-from-chatgpt-to-claude-without-losing-everything-it-knows-about-you',
  '2026/3/3/so-wechselst-du-von-chatgpt-zu-claude-ohne-alles-zu-verlieren-was-die-ki-schon-ber-dich-wei',
] as const
