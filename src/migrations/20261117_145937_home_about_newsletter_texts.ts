import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'
import d from './data/page-texts-2026-11.json'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE \`home_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`hero_de\` text,
  	\`intro_de\` text,
  	\`newsletter_de\` text,
  	\`hero_en\` text,
  	\`intro_en\` text,
  	\`newsletter_en\` text,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`home_page__status_idx\` ON \`home_page\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_home_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_hero_de\` text,
  	\`version_intro_de\` text,
  	\`version_newsletter_de\` text,
  	\`version_hero_en\` text,
  	\`version_intro_en\` text,
  	\`version_newsletter_en\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_home_page_v_version_version__status_idx\` ON \`_home_page_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_created_at_idx\` ON \`_home_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_updated_at_idx\` ON \`_home_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_home_page_v_latest_idx\` ON \`_home_page_v\` (\`latest\`);`)
  await db.run(sql`CREATE TABLE \`about_page\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`mission_de\` text,
  	\`two_ways_intro_de\` text,
  	\`ways_de\` text,
  	\`projects_link_de\` text,
  	\`remember_heading_de\` text,
  	\`contact_link_de\` text,
  	\`bio_heading_de\` text,
  	\`bio_de\` text,
  	\`now_link_de\` text,
  	\`mission_en\` text,
  	\`two_ways_intro_en\` text,
  	\`ways_en\` text,
  	\`projects_link_en\` text,
  	\`remember_heading_en\` text,
  	\`contact_link_en\` text,
  	\`bio_heading_en\` text,
  	\`bio_en\` text,
  	\`now_link_en\` text,
  	\`quote\` text,
  	\`quote_author\` text,
  	\`_status\` text DEFAULT 'draft',
  	\`updated_at\` text,
  	\`created_at\` text
  );
  `)
  await db.run(sql`CREATE INDEX \`about_page__status_idx\` ON \`about_page\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE \`_about_page_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`version_mission_de\` text,
  	\`version_two_ways_intro_de\` text,
  	\`version_ways_de\` text,
  	\`version_projects_link_de\` text,
  	\`version_remember_heading_de\` text,
  	\`version_contact_link_de\` text,
  	\`version_bio_heading_de\` text,
  	\`version_bio_de\` text,
  	\`version_now_link_de\` text,
  	\`version_mission_en\` text,
  	\`version_two_ways_intro_en\` text,
  	\`version_ways_en\` text,
  	\`version_projects_link_en\` text,
  	\`version_remember_heading_en\` text,
  	\`version_contact_link_en\` text,
  	\`version_bio_heading_en\` text,
  	\`version_bio_en\` text,
  	\`version_now_link_en\` text,
  	\`version_quote\` text,
  	\`version_quote_author\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer
  );
  `)
  await db.run(sql`CREATE INDEX \`_about_page_v_version_version__status_idx\` ON \`_about_page_v\` (\`version__status\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_created_at_idx\` ON \`_about_page_v\` (\`created_at\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_updated_at_idx\` ON \`_about_page_v\` (\`updated_at\`);`)
  await db.run(sql`CREATE INDEX \`_about_page_v_latest_idx\` ON \`_about_page_v\` (\`latest\`);`)
  await db.run(sql`ALTER TABLE \`newsletter_page\` ADD \`title_de\` text;`)
  await db.run(sql`ALTER TABLE \`newsletter_page\` ADD \`subline_de\` text;`)
  await db.run(sql`ALTER TABLE \`newsletter_page\` ADD \`join_heading_de\` text;`)
  await db.run(sql`ALTER TABLE \`newsletter_page\` ADD \`confirmed_heading_de\` text;`)
  await db.run(sql`ALTER TABLE \`newsletter_page\` ADD \`confirmed_text_de\` text;`)
  await db.run(sql`ALTER TABLE \`newsletter_page\` ADD \`title_en\` text;`)
  await db.run(sql`ALTER TABLE \`newsletter_page\` ADD \`subline_en\` text;`)
  await db.run(sql`ALTER TABLE \`newsletter_page\` ADD \`join_heading_en\` text;`)
  await db.run(sql`ALTER TABLE \`newsletter_page\` ADD \`confirmed_heading_en\` text;`)
  await db.run(sql`ALTER TABLE \`newsletter_page\` ADD \`confirmed_text_en\` text;`)
  await db.run(sql`ALTER TABLE \`_newsletter_page_v\` ADD \`version_title_de\` text;`)
  await db.run(sql`ALTER TABLE \`_newsletter_page_v\` ADD \`version_subline_de\` text;`)
  await db.run(sql`ALTER TABLE \`_newsletter_page_v\` ADD \`version_join_heading_de\` text;`)
  await db.run(sql`ALTER TABLE \`_newsletter_page_v\` ADD \`version_confirmed_heading_de\` text;`)
  await db.run(sql`ALTER TABLE \`_newsletter_page_v\` ADD \`version_confirmed_text_de\` text;`)
  await db.run(sql`ALTER TABLE \`_newsletter_page_v\` ADD \`version_title_en\` text;`)
  await db.run(sql`ALTER TABLE \`_newsletter_page_v\` ADD \`version_subline_en\` text;`)
  await db.run(sql`ALTER TABLE \`_newsletter_page_v\` ADD \`version_join_heading_en\` text;`)
  await db.run(sql`ALTER TABLE \`_newsletter_page_v\` ADD \`version_confirmed_heading_en\` text;`)
  await db.run(sql`ALTER TABLE \`_newsletter_page_v\` ADD \`version_confirmed_text_en\` text;`)

  // Current texts of home, about and newsletter page (until now in src/content/site.ts) as starting content.
  // Plain SQL, so later schema changes cannot break this migration.
  const now = new Date().toISOString()
  const j = (v: unknown) => JSON.stringify(v)

  const [introDe, newsletterDe, introEn, newsletterEn] = [d.introDe, d.newsletterDe, d.introEn, d.newsletterEn].map(j)
  await db.run(
    sql`INSERT INTO home_page (id, hero_de, intro_de, newsletter_de, hero_en, intro_en, newsletter_en, _status, updated_at, created_at) VALUES (1, ${d.heroDe}, ${introDe}, ${newsletterDe}, ${d.heroEn}, ${introEn}, ${newsletterEn}, 'published', ${now}, ${now});`,
  )
  await db.run(
    sql`INSERT INTO _home_page_v (version_hero_de, version_intro_de, version_newsletter_de, version_hero_en, version_intro_en, version_newsletter_en, version__status, version_updated_at, version_created_at, latest) VALUES (${d.heroDe}, ${introDe}, ${newsletterDe}, ${d.heroEn}, ${introEn}, ${newsletterEn}, 'published', ${now}, ${now}, 1);`,
  )

  // The quote moves from the old global "about-quote" into the about page
  const [bioDe, bioEn] = [d.bioDe, d.bioEn].map(j)
  await db.run(
    sql`INSERT INTO about_page (id, mission_de, two_ways_intro_de, ways_de, projects_link_de, remember_heading_de, contact_link_de, bio_heading_de, bio_de, now_link_de, mission_en, two_ways_intro_en, ways_en, projects_link_en, remember_heading_en, contact_link_en, bio_heading_en, bio_en, now_link_en, quote, quote_author, _status, updated_at, created_at) VALUES (1, ${d.missionDe}, ${d.twoWaysIntroDe}, ${d.waysDe}, ${d.projectsLinkDe}, ${d.rememberHeadingDe}, ${d.contactLinkDe}, ${d.bioHeadingDe}, ${bioDe}, ${d.nowLinkDe}, ${d.missionEn}, ${d.twoWaysIntroEn}, ${d.waysEn}, ${d.projectsLinkEn}, ${d.rememberHeadingEn}, ${d.contactLinkEn}, ${d.bioHeadingEn}, ${bioEn}, ${d.nowLinkEn}, (SELECT quote FROM about_quote ORDER BY id LIMIT 1), COALESCE((SELECT author FROM about_quote ORDER BY id LIMIT 1), 'Bruce Springsteen'), 'published', ${now}, ${now});`,
  )
  await db.run(
    sql`INSERT INTO _about_page_v (version_mission_de, version_two_ways_intro_de, version_ways_de, version_projects_link_de, version_remember_heading_de, version_contact_link_de, version_bio_heading_de, version_bio_de, version_now_link_de, version_mission_en, version_two_ways_intro_en, version_ways_en, version_projects_link_en, version_remember_heading_en, version_contact_link_en, version_bio_heading_en, version_bio_en, version_now_link_en, version_quote, version_quote_author, version__status, version_updated_at, version_created_at, latest) SELECT mission_de, two_ways_intro_de, ways_de, projects_link_de, remember_heading_de, contact_link_de, bio_heading_de, bio_de, now_link_de, mission_en, two_ways_intro_en, ways_en, projects_link_en, remember_heading_en, contact_link_en, bio_heading_en, bio_en, now_link_en, quote, quote_author, 'published', ${now}, ${now}, 1 FROM about_page WHERE id = 1;`,
  )

  await db.run(
    sql`UPDATE newsletter_page SET title_de = ${d.nlTitleDe}, subline_de = ${d.nlSublineDe}, join_heading_de = ${d.nlJoinHeadingDe}, confirmed_heading_de = ${d.nlConfirmedHeadingDe}, confirmed_text_de = ${d.nlConfirmedTextDe}, title_en = ${d.nlTitleEn}, subline_en = ${d.nlSublineEn}, join_heading_en = ${d.nlJoinHeadingEn}, confirmed_heading_en = ${d.nlConfirmedHeadingEn}, confirmed_text_en = ${d.nlConfirmedTextEn};`,
  )
  await db.run(
    sql`UPDATE _newsletter_page_v SET version_title_de = ${d.nlTitleDe}, version_subline_de = ${d.nlSublineDe}, version_join_heading_de = ${d.nlJoinHeadingDe}, version_confirmed_heading_de = ${d.nlConfirmedHeadingDe}, version_confirmed_text_de = ${d.nlConfirmedTextDe}, version_title_en = ${d.nlTitleEn}, version_subline_en = ${d.nlSublineEn}, version_join_heading_en = ${d.nlJoinHeadingEn}, version_confirmed_heading_en = ${d.nlConfirmedHeadingEn}, version_confirmed_text_en = ${d.nlConfirmedTextEn} WHERE latest = 1;`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`home_page\`;`)
  await db.run(sql`DROP TABLE \`_home_page_v\`;`)
  await db.run(sql`DROP TABLE \`about_page\`;`)
  await db.run(sql`DROP TABLE \`_about_page_v\`;`)
  await db.run(sql`ALTER TABLE \`newsletter_page\` DROP COLUMN \`title_de\`;`)
  await db.run(sql`ALTER TABLE \`newsletter_page\` DROP COLUMN \`subline_de\`;`)
  await db.run(sql`ALTER TABLE \`newsletter_page\` DROP COLUMN \`join_heading_de\`;`)
  await db.run(sql`ALTER TABLE \`newsletter_page\` DROP COLUMN \`confirmed_heading_de\`;`)
  await db.run(sql`ALTER TABLE \`newsletter_page\` DROP COLUMN \`confirmed_text_de\`;`)
  await db.run(sql`ALTER TABLE \`newsletter_page\` DROP COLUMN \`title_en\`;`)
  await db.run(sql`ALTER TABLE \`newsletter_page\` DROP COLUMN \`subline_en\`;`)
  await db.run(sql`ALTER TABLE \`newsletter_page\` DROP COLUMN \`join_heading_en\`;`)
  await db.run(sql`ALTER TABLE \`newsletter_page\` DROP COLUMN \`confirmed_heading_en\`;`)
  await db.run(sql`ALTER TABLE \`newsletter_page\` DROP COLUMN \`confirmed_text_en\`;`)
  await db.run(sql`ALTER TABLE \`_newsletter_page_v\` DROP COLUMN \`version_title_de\`;`)
  await db.run(sql`ALTER TABLE \`_newsletter_page_v\` DROP COLUMN \`version_subline_de\`;`)
  await db.run(sql`ALTER TABLE \`_newsletter_page_v\` DROP COLUMN \`version_join_heading_de\`;`)
  await db.run(sql`ALTER TABLE \`_newsletter_page_v\` DROP COLUMN \`version_confirmed_heading_de\`;`)
  await db.run(sql`ALTER TABLE \`_newsletter_page_v\` DROP COLUMN \`version_confirmed_text_de\`;`)
  await db.run(sql`ALTER TABLE \`_newsletter_page_v\` DROP COLUMN \`version_title_en\`;`)
  await db.run(sql`ALTER TABLE \`_newsletter_page_v\` DROP COLUMN \`version_subline_en\`;`)
  await db.run(sql`ALTER TABLE \`_newsletter_page_v\` DROP COLUMN \`version_join_heading_en\`;`)
  await db.run(sql`ALTER TABLE \`_newsletter_page_v\` DROP COLUMN \`version_confirmed_heading_en\`;`)
  await db.run(sql`ALTER TABLE \`_newsletter_page_v\` DROP COLUMN \`version_confirmed_text_en\`;`)
}
