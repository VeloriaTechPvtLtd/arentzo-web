import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { MyRentalsPage } from '@/features/rentals/ui/pages/MyRentalsPage';

export const metadata = createPageMetadata(PAGE_SEO.myRentals);

export default function Page() {
  return <MyRentalsPage />;
}
