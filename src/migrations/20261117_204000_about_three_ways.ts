import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

/** About page: "three ways" with links, no projects button (content only, no schema change). */
const T = {
  introDe: 'Meine Mission lebe ich auf drei Wegen:',
  waysDe: '[Eigene Ideen umsetzen](/projects)\n[Andere beraten](https://www.spark-innovation.de)\n[Inspirierendes mit der Welt teilen](/newsletter)',
  introEn: 'Living up to my mission three ways:',
  waysEn: '[Realizing own ideas](/projects)\n[Consulting others](https://www.spark-innovation.de)\n[Sharing inspiring stuff with the world](/newsletter)',
}

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(
    sql`UPDATE about_page SET two_ways_intro_de = ${T.introDe}, ways_de = ${T.waysDe}, two_ways_intro_en = ${T.introEn}, ways_en = ${T.waysEn}, projects_link_de = NULL, projects_link_en = NULL;`,
  )
  // Keep the CMS editor (latest version) in sync, so a later "publish" does not bring back the old text
  await db.run(
    sql`UPDATE _about_page_v SET version_two_ways_intro_de = ${T.introDe}, version_ways_de = ${T.waysDe}, version_two_ways_intro_en = ${T.introEn}, version_ways_en = ${T.waysEn}, version_projects_link_de = NULL, version_projects_link_en = NULL WHERE latest = 1;`,
  )
}

export async function down(_args: MigrateDownArgs): Promise<void> {}
