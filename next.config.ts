/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  eslint: {
    // Ye build ke waqt linting errors ko ignore karega
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ye typescript errors ko ignore karega
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
