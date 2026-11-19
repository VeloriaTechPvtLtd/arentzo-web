'use client';

import { useSearchParams } from 'next/navigation';
import { MyRentalsPage } from '@/features/rentals/ui/pages/MyRentalsPage';
import { RentalDetailPage } from '@/features/rentals/ui/pages/RentalDetailPage';

export function MyRentalsRoute() {
  const searchParams = useSearchParams();
  const rentalId = (searchParams.get('id') ?? '').trim() || undefined;
  return rentalId ? <RentalDetailPage rentalId={rentalId} /> : <MyRentalsPage />;
}
