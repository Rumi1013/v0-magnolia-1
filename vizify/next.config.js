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
  // Explicitly enable App Router
  experimental: {
    appDir: true,
  },
  // Ensure Pages Router continues to work alongside App Router
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Redirects for better compatibility
  async redirects() {
    return [
      {
        source: '/pages',
        destination: '/',
        permanent: false,
      },
    ];
  },
}

module.exports = nextConfig