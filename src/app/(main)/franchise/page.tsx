import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { FranchisePage } from '@/features/business-pages';

export const metadata = createPageMetadata(PAGE_SEO.franchise);

export default function Page() {
  return <FranchisePage />;
}
