import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable static export for deployment to static hosting
  output: 'export',

  // Image optimization must be disabled for static export
  images: {
    unoptimized: true,
  },

  // Enable React strict mode for better development experience
  reactStrictMode: true,
};

export default nextConfig;
