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
  // Ensure stable output for Vercel
  poweredByHeader: false,
  // Set production output method
  output: 'export',
  // Keep Vercel compatible
  distDir: '.next',
}

module.exports = nextConfig