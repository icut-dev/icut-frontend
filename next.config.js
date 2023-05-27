/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  experimental: {
    appDir: true,
  },
  sassOptions: {
    fiber: true,
    includePaths: [path.join(__dirname, 'styles')],
  },

  images: {
    remotePatterns: [
      {
        hostname: 'github.com'
      }
    ]
  }
};

module.exports = nextConfig;
