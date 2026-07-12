import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { ContactUsPage } from '@/features/info/ui/pages/ContactUsPage';

export const metadata = createPageMetadata(PAGE_SEO.contact);

export default function Page() {
  return <ContactUsPage />;
}
