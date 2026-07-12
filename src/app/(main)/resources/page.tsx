import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { ResourcesPage } from '@/features/business-pages';

export const metadata = createPageMetadata(PAGE_SEO.resources);

export default function Page() {
  return <ResourcesPage />;
}
