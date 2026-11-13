import { SiteShell, siteMetadata, siteViewport } from '@/components/SiteShell'

export const metadata = siteMetadata('de')
export const viewport = siteViewport

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteShell lang="de">{children}</SiteShell>
}
