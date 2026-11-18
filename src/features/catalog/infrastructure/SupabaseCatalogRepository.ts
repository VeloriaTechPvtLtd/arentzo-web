import type { Product } from '@/shared/types/product';
import { getSupabaseClient } from '@/shared/infrastructure/supabase/client';

type ProductRow = {
  id: string; title: string | null; name: string | null; daily_rate: number | null;
  price: number | null; original_price_per_day: number | null; rating: number | null;
  average_rating: number | null; review_count: number | null; total_reviews: number | null;
  images: string[] | null; media: unknown; image_url: string | null; thumbnail_url: string | null;
  brand: string | null; description: string | null; category_id: string | null; quantity_available: number | null;
};

function imageList(row: ProductRow): string[] {
  const fromImages = Array.isArray(row.images) ? row.images : [];
  const fromMedia = Array.isArray(row.media) ? row.media.filter((item): item is string => typeof item === 'string') : [];
  return [...fromImages, ...fromMedia, row.image_url, row.thumbnail_url].filter((item): item is string => Boolean(item));
}

function mapProduct(row: ProductRow): Product {
  const images = imageList(row);
  return {
    id: row.id, name: row.title || row.name || 'Rental item', image: images[0] || '/placeholder.svg', images,
    price: Number(row.daily_rate ?? row.price ?? 0), originalPrice: row.original_price_per_day ?? undefined,
    rating: Number(row.average_rating ?? row.rating ?? 0), reviewCount: Number(row.total_reviews ?? row.review_count ?? 0),
    isAvailable: (row.quantity_available ?? 0) > 0, quantity: 0, brand: row.brand || undefined,
    category: row.category_id || undefined, overview: row.description || undefined,
  };
}

export class SupabaseCatalogRepository {
  async getAvailableProducts(): Promise<Product[]> {
    const { data, error } = await getSupabaseClient().from('products')
      .select('id,title,name,daily_rate,price,original_price_per_day,rating,average_rating,review_count,total_reviews,images,media,image_url,thumbnail_url,brand,description,category_id,quantity_available')
      .eq('is_active', true).is('deleted_at', null).limit(30);
    if (error) throw error;
    return ((data || []) as ProductRow[]).map(mapProduct);
  }
}
