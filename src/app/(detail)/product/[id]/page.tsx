import type { Metadata } from 'next';
import { ProductDetailsPage } from '@/features/customer-home/ui/pages/ProductDetailsPage';
import { createPageMetadata, PAGE_SEO } from '@/lib/seo';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return createPageMetadata({
    title: `Product ${id}`,
    description: PAGE_SEO.product.description,
    path: `/product/${id}`,
  });
}

export default function ProductDetailsRoute() {
  return <ProductDetailsPage />;
}
