import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const staticExport = process.env.STATIC_EXPORT === 'true';

const nextConfig = {
  reactStrictMode: true,
  output: staticExport ? 'export' : 'standalone',
  trailingSlash: staticExport,
  pageExtensions: staticExport ? ['tsx', 'ts', 'jsx', 'js'] : ['server.tsx', 'tsx', 'ts', 'jsx', 'js'],
  // Supabase uses these public client values in the browser at build time.
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  },
  images: {
    unoptimized: staticExport,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};

export default nextConfig;
