/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: 'backend',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // In Docker dev, localhost:8000 is inaccessible from within the Next.js container.
    // Disable optimization for external images so browsers fetch them directly.
    unoptimized: process.env.NODE_ENV === 'development',
  },
  async rewrites() {
    return [];
  },
};

module.exports = nextConfig;
