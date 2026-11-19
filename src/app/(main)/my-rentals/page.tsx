import { Suspense } from 'react';
import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { MyRentalsRoute } from './MyRentalsRoute';

export const metadata = createPageMetadata(PAGE_SEO.myRentals);

export default function Page() {
  return (
    <Suspense fallback={<main className="min-h-screen" aria-busy="true" />}>
      <MyRentalsRoute />
    </Suspense>
  );
}
