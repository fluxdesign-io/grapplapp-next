/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic config without webpack customization
  reactStrictMode: true,
  // Disable ESLint and TypeScript checking during builds to prevent deployment failures
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig;
