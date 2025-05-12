/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['v0.blob.com', 'placeholder-for-your-logo.com', 'via.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // App directory support
  experimental: {
    appDir: true,
  },
  // Output directory
  distDir: '.next',
  // Ensure stable output for Vercel
  poweredByHeader: false,
  // Typescript
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  // Important for Next 13+ compatibility
  webpack(config) {
    return config;
  },
}

module.exports = nextConfig