import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/favorites',
          '/my-rentals',
          '/my-rentals/',
          '/provider-dashboard',
          '/provider-dashboard/',
          '/provider-onboarding',
          '/filters-test',
          '/home',
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
