'use client';

import { useSearchParams } from 'next/navigation';
import { ProductDetailsPage } from '@/features/customer-home/ui/pages/ProductDetailsPage';

export function ProductQueryRoute() {
  const searchParams = useSearchParams();
  const id = (searchParams.get('id') ?? '').trim();

  if (!id) {
    return <main className="min-h-screen p-6"><p role="alert">This listing link is missing its ID.</p></main>;
  }

  return <ProductDetailsPage id={id} />;
}
