import config from '@payload-config'
import { getPayload } from 'payload'
import type { Config } from '@/payload-types'

type GlobalSlug = keyof Config['globals']

/** Reads a global from the CMS; returns null if the CMS is not reachable, so pages can fall back to built-in texts. */
export async function getGlobalSafe<S extends GlobalSlug>(slug: S): Promise<Config['globals'][S] | null> {
  try {
    const payload = await getPayload({ config })
    return (await payload.findGlobal({ slug, depth: 0 })) as Config['globals'][S]
  } catch (err) {
    console.error(`cms global ${slug}`, err)
    return null
  }
}

/** Splits a textarea value into its non-empty lines; falls back when empty. */
export function toLines(value: string | null | undefined, fallback: string[]): string[] {
  const lines = (value || '').split('\n').map((l) => l.trim()).filter(Boolean)
  return lines.length ? lines : fallback
}

/** Returns the trimmed text or the fallback when empty. */
export function orText(value: string | null | undefined, fallback: string): string {
  return value?.trim() || fallback
}
