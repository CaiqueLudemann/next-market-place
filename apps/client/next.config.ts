import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable React strict mode for highlighting potential problems
  reactStrictMode: true,

  // Transpile packages from the monorepo
  transpilePackages: ['@marketplace/database', '@marketplace/utils'],

  // Optimize production builds
  productionBrowserSourceMaps: false,

  // Configure TypeScript behavior
  typescript: {
    // Fail build on TypeScript errors
    ignoreBuildErrors: false,
  },

  // Configure ESLint behavior
  eslint: {
    // Fail build on ESLint errors
    ignoreDuringBuilds: false,
  },

  // Configure external image domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },

  // Experimental features
  experimental: {
    // Enable optimized package imports (none configured yet)
  },
}

export default nextConfig
