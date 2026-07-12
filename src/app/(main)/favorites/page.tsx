import { createPageMetadata, PAGE_SEO } from '@/lib/seo';
import { FavoritesPage } from '@/features/favorites/ui/pages/FavoritesPage';

export const metadata = createPageMetadata(PAGE_SEO.favorites);

export default function Page() {
  return <FavoritesPage />;
}
