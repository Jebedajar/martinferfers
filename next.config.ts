import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  // Packages with Cloudflare Workers (workerd) specific code
  // Read more: https://opennext.js.org/cloudflare/howtos/workerd
  serverExternalPackages: ['jose', 'pg-cloudflare'],

  // Old Squarespace URLs
  async redirects() {
    return [
      { source: '/info', destination: '/', permanent: true },
      { source: '/home', destination: '/', permanent: true },
      // One address for search engines: www → martinferfers.de
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.martinferfers.de' }],
        destination: 'https://martinferfers.de/:path*',
        statusCode: 301,
      },
      // "Sparks" is now called "Projects"
      { source: '/sparks', destination: '/projects', permanent: true },
      { source: '/en/sparks', destination: '/en/projects', permanent: true },
      { source: '/de', destination: '/', permanent: true },
      { source: '/de/:path*', destination: '/:path*', permanent: true },
    ]
  },

  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
