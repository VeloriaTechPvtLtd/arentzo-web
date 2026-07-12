import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { TermsConditionsPage } from '@/features/info/ui/pages/TermsConditionsPage';

export const metadata = createPageMetadata(PAGE_SEO.terms);

export default function Page() {
  return <TermsConditionsPage />;
}
