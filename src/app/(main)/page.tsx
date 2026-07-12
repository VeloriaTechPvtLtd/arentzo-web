import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import HomePageClient from './HomePageClient';

export const metadata = createPageMetadata(PAGE_SEO.home);

export default function HomePage() {
  return <HomePageClient />;
}
