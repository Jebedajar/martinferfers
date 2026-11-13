import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'
import data from './data/newsletter-page.json'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`newsletter_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`content_de\` text,
  	\`bio_de\` text,
  	\`content_en\` text,
  	\`bio_en\` text,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`newsletter_page__status_idx\` ON \`newsletter_page\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_newsletter_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_content_de\` text,
  	\`version_bio_de\` text,
  	\`version_content_en\` text,
  	\`version_bio_en\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_newsletter_page_v_version_version__status_idx\` ON \`_newsletter_page_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_newsletter_page_v_created_at_idx\` ON \`_newsletter_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_newsletter_page_v_updated_at_idx\` ON \`_newsletter_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_newsletter_page_v_latest_idx\` ON \`_newsletter_page_v\` (\`latest\`);`)

  // Initial texts of the newsletter page (plain SQL, so later schema changes cannot break this migration)
  const now = new Date().toISOString()
  const [cDe, bDe, cEn, bEn] = [data.contentDe, data.bioDe, data.contentEn, data.bioEn].map((d) => JSON.stringify(d))
  await db.run(
    sql`INSERT INTO newsletter_page (id, content_de, bio_de, content_en, bio_en, _status, updated_at, created_at) VALUES (1, ${cDe}, ${bDe}, ${cEn}, ${bEn}, 'published', ${now}, ${now});`,
  )
  await db.run(
    sql`INSERT INTO _newsletter_page_v (version_content_de, version_bio_de, version_content_en, version_bio_en, version__status, version_updated_at, version_created_at, latest) VALUES (${cDe}, ${bDe}, ${cEn}, ${bEn}, 'published', ${now}, ${now}, 1);`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`newsletter_page\`;`)
  await db.run(sql`DROP TABLE \`_newsletter_page_v\`;`)
}
