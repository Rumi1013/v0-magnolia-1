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
  // For Next.js 13+ compatibility
  appDir: true,
  // For better debug information
  distDir: '.next',
  // For preserving the original structure
  trailingSlash: true,
  // Force static optimization for better compatibility
  output: 'standalone',
  // Handle redirects
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: '/',
        permanent: false,
      }
    ];
  },
}

module.exports = nextConfig