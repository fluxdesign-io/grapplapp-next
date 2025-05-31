/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic config without webpack customization
  reactStrictMode: true,
  // Disable ESLint during builds to prevent deployment failures
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
