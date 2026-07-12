import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { WarehousePage } from '@/features/business-pages';

export const metadata = createPageMetadata(PAGE_SEO.warehouse);

export default function Page() {
  return <WarehousePage />;
}
