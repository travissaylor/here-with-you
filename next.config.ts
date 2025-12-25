import type { NextConfig } from 'next';
import withPWA from '@ducanh2912/next-pwa';

const nextConfig: NextConfig = {
  // Enable static export for deployment to static hosting
  output: 'export',

  // Image optimization must be disabled for static export
  images: {
    unoptimized: true,
  },

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Empty turbopack config to acknowledge we're using webpack for PWA
  turbopack: {},
};

const config = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [
      {
        urlPattern: /^\/audio\/messages\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'audio-cache',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^\/images\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'image-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 24 * 60 * 60, // 60 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^\/.*$/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'page-cache',
          networkTimeoutSeconds: 1,
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
    additionalManifestEntries: [
      { url: '/audio/messages/travis_test.m4a', revision: null },
    ],
  },
})(nextConfig);

export default config;
