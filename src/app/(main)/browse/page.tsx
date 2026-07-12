import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { CustomerHomePage } from '@/features/customer-home/ui/pages/CustomerHomePage';

export const metadata = createPageMetadata(PAGE_SEO.browse);

export default function Page() {
  return <CustomerHomePage />;
}
