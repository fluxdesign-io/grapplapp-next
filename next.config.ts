import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enforce white background and prevent flash of unstyled content
  experimental: {
    // This will help with faster page loads and reduce flash of unstyled content
    optimizeFonts: true,
    optimizeCss: true,
    // Minimize JS to load styles faster
    optimizePackageImports: ['framer-motion']
  },
  // Configure webpack to inject style preload
  webpack: (config, { isServer }) => {
    // Only in client builds
    if (!isServer) {
      // Injecting global CSS to ensure white background at build time
      config.module.rules.push({
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      });
    }
    return config;
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
