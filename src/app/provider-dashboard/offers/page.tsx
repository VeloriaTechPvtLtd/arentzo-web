import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { ProviderOffersPage } from '@/features/provider-dashboard/ui/pages/ProviderOffersPage';

export const metadata = createPageMetadata(PAGE_SEO.providerOffers);

export default function Page() {
  return <ProviderOffersPage />;
}
