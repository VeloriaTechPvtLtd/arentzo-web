import type { MetadataRoute } from 'next';
import {
  BLOG_SLUGS,
  PUBLIC_SEO_PATHS,
  SITE_URL,
  absoluteUrl,
} from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = PUBLIC_SEO_PATHS.map(
    ({ path, priority, changeFrequency }) => ({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency,
      priority,
    }),
  );

  const blogEntries: MetadataRoute.Sitemap = BLOG_SLUGS.map((slug) => ({
    url: absoluteUrl(`/blog/${slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}

// Ensure SITE_URL is referenced so misconfigured envs are obvious in logs.
void SITE_URL;
