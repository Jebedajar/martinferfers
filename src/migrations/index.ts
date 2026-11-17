import * as migration_20261030_092423_initial from './20261030_092423_initial';
import * as migration_20261030_092430_bilingual_posts_schema from './20261030_092430_bilingual_posts_schema';
import * as migration_20261030_092500_legacy_posts from './20261030_092500_legacy_posts';
import * as migration_20261030_133243_now_page from './20261030_133243_now_page';
import * as migration_20261031_195149_about_quote from './20261031_195149_about_quote';
import * as migration_20261106_120000_post_winter_is_coming from './20261106_120000_post_winter_is_coming';
import * as migration_20261106_124500_update_winter_is_coming from './20261106_124500_update_winter_is_coming';
import * as migration_20261106_144500_winter_is_coming_variants from './20261106_144500_winter_is_coming_variants';
import * as migration_20261113_120000_bilingual_posts_data from './20261113_120000_bilingual_posts_data';
import * as migration_20261113_205901_newsletter_page from './20261113_205901_newsletter_page';
import * as migration_20261117_145414_now_page_bilingual from './20261117_145414_now_page_bilingual';
import * as migration_20261117_145937_home_about_newsletter_texts from './20261117_145937_home_about_newsletter_texts';
import * as migration_20261117_204000_about_three_ways from './20261117_204000_about_three_ways';

export const migrations = [
  {
    up: migration_20261030_092423_initial.up,
    down: migration_20261030_092423_initial.down,
    name: '20261030_092423_initial',
  },
  {
    up: migration_20261030_092430_bilingual_posts_schema.up,
    down: migration_20261030_092430_bilingual_posts_schema.down,
    name: '20261030_092430_bilingual_posts_schema',
  },
  {
    up: migration_20261030_092500_legacy_posts.up,
    down: migration_20261030_092500_legacy_posts.down,
    name: '20261030_092500_legacy_posts',
  },
  {
    up: migration_20261030_133243_now_page.up,
    down: migration_20261030_133243_now_page.down,
    name: '20261030_133243_now_page',
  },
  {
    up: migration_20261031_195149_about_quote.up,
    down: migration_20261031_195149_about_quote.down,
    name: '20261031_195149_about_quote',
  },
  {
    up: migration_20261106_120000_post_winter_is_coming.up,
    down: migration_20261106_120000_post_winter_is_coming.down,
    name: '20261106_120000_post_winter_is_coming',
  },
  {
    up: migration_20261106_124500_update_winter_is_coming.up,
    down: migration_20261106_124500_update_winter_is_coming.down,
    name: '20261106_124500_update_winter_is_coming',
  },
  {
    up: migration_20261106_144500_winter_is_coming_variants.up,
    down: migration_20261106_144500_winter_is_coming_variants.down,
    name: '20261106_144500_winter_is_coming_variants',
  },
  {
    up: migration_20261113_120000_bilingual_posts_data.up,
    down: migration_20261113_120000_bilingual_posts_data.down,
    name: '20261113_120000_bilingual_posts_data',
  },
  {
    up: migration_20261113_205901_newsletter_page.up,
    down: migration_20261113_205901_newsletter_page.down,
    name: '20261113_205901_newsletter_page',
  },
  {
    up: migration_20261117_145414_now_page_bilingual.up,
    down: migration_20261117_145414_now_page_bilingual.down,
    name: '20261117_145414_now_page_bilingual',
  },
  {
    up: migration_20261117_145937_home_about_newsletter_texts.up,
    down: migration_20261117_145937_home_about_newsletter_texts.down,
    name: '20261117_145937_home_about_newsletter_texts'
  },
  {
    up: migration_20261117_204000_about_three_ways.up,
    down: migration_20261117_204000_about_three_ways.down,
    name: '20261117_204000_about_three_ways',
  },
];
