const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  transpilePackages: ['@codelab/ui'],
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
    
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },

    ],
  },
};

module.exports = nextConfig;
