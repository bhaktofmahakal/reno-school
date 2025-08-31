/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      }
    ],
    unoptimized: process.env.NODE_ENV === 'production',
  },
  // For static exports (if needed)
  trailingSlash: true,
  // Ensure images are included in build
  experimental: {
    outputFileTracingRoot: undefined,
  }
}

module.exports = nextConfig