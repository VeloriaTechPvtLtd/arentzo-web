import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { ProviderOnboardingPage } from '@/features/provider-onboarding/ui/pages/ProviderOnboardingPage';

export const metadata = createPageMetadata(PAGE_SEO.providerOnboarding);

export default function Page() {
  return <ProviderOnboardingPage />;
}
