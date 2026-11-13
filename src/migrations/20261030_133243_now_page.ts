import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'
import nowPage from './data/now-page.json'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`now_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text DEFAULT 'What I´m doing now',
  	\`content\` text,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`now_page__status_idx\` ON \`now_page\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_now_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_title\` text DEFAULT 'What I´m doing now',
  	\`version_content\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_now_page_v_version_version__status_idx\` ON \`_now_page_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_now_page_v_created_at_idx\` ON \`_now_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_now_page_v_updated_at_idx\` ON \`_now_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_now_page_v_latest_idx\` ON \`_now_page_v\` (\`latest\`);`)

  // Content of the old /now page
  await payload.updateGlobal({
    slug: 'now-page',
    data: { ...(nowPage as any), _status: 'published' },
    draft: false,
    req,
  })
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`now_page\`;`)
  await db.run(sql`DROP TABLE \`_now_page_v\`;`)
}
