import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { PartnerPage } from '@/features/business-pages';

export const metadata = createPageMetadata(PAGE_SEO.partner);

export default function Page() {
  return <PartnerPage />;
}
