import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { ProviderProductsPage } from '@/features/provider-dashboard/ui/pages/ProviderProductsPage';

export const metadata = createPageMetadata(PAGE_SEO.providerProducts);

export default function Page() {
  return <ProviderProductsPage />;
}
