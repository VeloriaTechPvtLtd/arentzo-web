import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { FaqPage } from '@/features/info/ui/pages/FaqPage';

export const metadata = createPageMetadata(PAGE_SEO.faqs);

export default function Page() {
  return <FaqPage />;
}
