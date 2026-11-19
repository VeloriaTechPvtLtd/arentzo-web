import { Suspense } from 'react';
import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { ProductQueryRoute } from './ProductQueryRoute';

export const metadata = createPageMetadata(PAGE_SEO.product);

export default function ProductRoute() {
  return (
    <Suspense fallback={<main className="min-h-screen p-6" aria-busy="true">Loading listing…</main>}>
      <ProductQueryRoute />
    </Suspense>
  );
}
