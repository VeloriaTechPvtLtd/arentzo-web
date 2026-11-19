import type { Metadata } from 'next';
import { RentalDetailPage } from '@/features/rentals/ui/pages/RentalDetailPage';
import { createPageMetadata, PAGE_SEO } from '@/lib/seo';

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return createPageMetadata({
    title: `Rental ${id}`,
    description: PAGE_SEO.rentalDetail.description,
    path: `/my-rentals/${id}`,
    noIndex: true,
  });
}

export default async function RentalDetailRoute({ params }: Props) {
  const { id } = await params;
  return <RentalDetailPage rentalId={id} />;
}
