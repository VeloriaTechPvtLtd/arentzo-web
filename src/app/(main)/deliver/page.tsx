import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { DeliverPage } from '@/features/business-pages';

export const metadata = createPageMetadata(PAGE_SEO.deliver);

export default function Page() {
  return <DeliverPage />;
}
