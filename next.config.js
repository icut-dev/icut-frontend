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
      },
      {
       hostname: 'icut-bucket.s3.sa-east-1.amazonaws.com' 
      }
    ]
  }
};

module.exports = nextConfig;
