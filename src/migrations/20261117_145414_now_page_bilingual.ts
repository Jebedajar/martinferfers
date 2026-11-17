import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'
import data from './data/now-page-2026-11.json'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`now_page\` ADD \`title_de\` text DEFAULT 'Was ich gerade mache';`)
  await db.run(sql`ALTER TABLE \`now_page\` ADD \`content_de\` text;`)
  await db.run(sql`ALTER TABLE \`_now_page_v\` ADD \`version_title_de\` text DEFAULT 'Was ich gerade mache';`)
  await db.run(sql`ALTER TABLE \`_now_page_v\` ADD \`version_content_de\` text;`)

  // /now update November 2026 (German + English)
  const now = new Date().toISOString()
  const [content, contentDe] = [data.content, data.contentDe].map((d) => JSON.stringify(d))
  await db.run(
    sql`UPDATE now_page SET title = ${data.title}, content = ${content}, title_de = ${data.titleDe}, content_de = ${contentDe}, _status = 'published', updated_at = ${now} WHERE id = 1;`,
  )
  await db.run(sql`UPDATE _now_page_v SET latest = 0;`)
  await db.run(
    sql`INSERT INTO _now_page_v (version_title, version_content, version_title_de, version_content_de, version__status, version_updated_at, version_created_at, latest) VALUES (${data.title}, ${content}, ${data.titleDe}, ${contentDe}, 'published', ${now}, ${now}, 1);`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`now_page\` DROP COLUMN \`title_de\`;`)
  await db.run(sql`ALTER TABLE \`now_page\` DROP COLUMN \`content_de\`;`)
  await db.run(sql`ALTER TABLE \`_now_page_v\` DROP COLUMN \`version_title_de\`;`)
  await db.run(sql`ALTER TABLE \`_now_page_v\` DROP COLUMN \`version_content_de\`;`)
}
