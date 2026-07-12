import { Suspense } from 'react';
import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { SearchResultsPage } from '@/features/search/ui/pages/SearchResultsPage';

export const metadata = createPageMetadata(PAGE_SEO.search);

export default function SearchPageRoute() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading search...</div>}>
      <SearchResultsPage />
    </Suspense>
  );
}
