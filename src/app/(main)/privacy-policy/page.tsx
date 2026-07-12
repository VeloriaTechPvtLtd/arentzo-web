import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { PrivacyPolicyPage } from '@/features/info/ui/pages/PrivacyPolicyPage';

export const metadata = createPageMetadata(PAGE_SEO.privacy);

export default function Page() {
  return <PrivacyPolicyPage />;
}
