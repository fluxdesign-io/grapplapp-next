import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enforce white background and prevent flash of unstyled content
  experimental: {
    // Enable CSS optimization for better loading performance
    optimizeCss: true,
    // Minimize JS to load styles faster
    optimizePackageImports: ['framer-motion']
  },
  // Force white background in the HTML head before any JS loads
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
