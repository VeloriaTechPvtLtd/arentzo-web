import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { AboutUsPage } from '@/features/info/ui/pages/AboutUsPage';

export const metadata = createPageMetadata(PAGE_SEO.about);

export default function Page() {
  return <AboutUsPage />;
}
