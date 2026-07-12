import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { CareersPage } from '@/features/business-pages';

export const metadata = createPageMetadata(PAGE_SEO.careers);

export default function Page() {
  return <CareersPage />;
}
