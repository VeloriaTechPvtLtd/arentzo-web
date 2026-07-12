import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { BlogPage } from '@/features/business-pages';

export const metadata = createPageMetadata(PAGE_SEO.blog);

export default function Page() {
  return <BlogPage />;
}
