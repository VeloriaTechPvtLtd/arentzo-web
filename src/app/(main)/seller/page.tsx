import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { SellerPage } from '@/features/business-pages';

export const metadata = createPageMetadata(PAGE_SEO.seller);

export default function Page() {
  return <SellerPage />;
}
