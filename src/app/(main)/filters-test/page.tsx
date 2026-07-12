import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { FilterTestPage } from '@/features/filters/ui/pages/FilterTestPage';

export const metadata = createPageMetadata(PAGE_SEO.filtersTest);

export default function Page() {
  return <FilterTestPage />;
}
