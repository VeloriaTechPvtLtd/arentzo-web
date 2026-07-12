import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { ProviderOrdersPage } from '@/features/provider-dashboard/ui/pages/ProviderOrdersPage';

export const metadata = createPageMetadata(PAGE_SEO.providerOrders);

export default function Page() {
  return <ProviderOrdersPage />;
}
