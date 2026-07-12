import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { ProviderDashboard } from '@/features/provider-dashboard/ui/pages/ProviderDashboard';

export const metadata = createPageMetadata(PAGE_SEO.providerDashboard);

export default function Page() {
  return <ProviderDashboard />;
}
