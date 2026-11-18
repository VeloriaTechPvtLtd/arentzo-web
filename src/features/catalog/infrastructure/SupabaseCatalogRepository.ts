import type { Product } from '@/shared/types/product';
import type { CatalogRepository } from '../application/ports/CatalogRepository';
import type { Category } from '@/features/customer-home/domain/entities/types';
import { getSupabaseClient } from '@/shared/infrastructure/supabase/client';

type ProductRow = {
  id: string; title: string | null; name: string | null; daily_rate: number | null;
  price: number | null; currency: string | null; original_price_per_day: number | null; rating: number | null;
  average_rating: number | null; review_count: number | null; total_reviews: number | null;
  images: string[] | null; media: unknown; image_url: string | null; thumbnail_url: string | null;
  brand: string | null; description: string | null; category_id: string | null; quantity_available: number | null;
};
type CategoryRow = { id: string; name: string; icon: string | null; image_url: string | null };

function imageList(row: ProductRow): string[] {
  const fromImages = Array.isArray(row.images) ? row.images : [];
  const fromMedia = Array.isArray(row.media) ? row.media.filter((item): item is string => typeof item === 'string') : [];
  return [...fromImages, ...fromMedia, row.image_url, row.thumbnail_url].filter((item): item is string => Boolean(item));
}

function mapProduct(row: ProductRow): Product {
  const images = imageList(row);
  const price = Number(row.daily_rate ?? row.price ?? 0);
  const originalPrice = Number(row.original_price_per_day ?? 0);
  return {
    id: row.id, name: row.title || row.name || 'Rental item', image: images[0] || '/placeholder.svg', images,
    price, currency: row.currency || 'INR', originalPrice: originalPrice > price ? originalPrice : undefined,
    rating: Number(row.average_rating ?? row.rating ?? 0), reviewCount: Number(row.total_reviews ?? row.review_count ?? 0),
    isAvailable: (row.quantity_available ?? 0) > 0, quantity: 0, brand: row.brand || undefined,
    category: row.category_id || undefined, overview: row.description || undefined,
  };
}

export class SupabaseCatalogRepository implements CatalogRepository {
  async getCategories(): Promise<Category[]> {
    const { data, error } = await getSupabaseClient().from('categories')
      .select('id,name,icon,image_url').eq('is_active', true).is('parent_id', null).order('display_order').limit(50);
    if (error) throw error;
    return ((data || []) as CategoryRow[]).map((row) => ({
      id: row.id,
      name: row.name,
      icon: row.icon || this.getCategoryIcon(row.name),
      subcategories: [],
    }));
  }

  async getAvailableProducts(): Promise<Product[]> {
    const { data, error } = await getSupabaseClient().from('products')
      .select('id,title,name,daily_rate,price,currency,original_price_per_day,rating,average_rating,review_count,total_reviews,images,media,image_url,thumbnail_url,brand,description,category_id,quantity_available')
      .eq('is_active', true).is('deleted_at', null).limit(30);
    if (error) throw error;
    return ((data || []) as ProductRow[]).map(mapProduct);
  }

  async getFavoriteProductIds(userId: string): Promise<string[]> {
    const { data, error } = await getSupabaseClient().from('wishlists').select('product_id').eq('user_id', userId);
    if (error) throw error;
    return (data || []).map((row) => row.product_id).filter((id): id is string => Boolean(id));
  }

  async getProductsByIds(ids: string[]): Promise<Product[]> {
    if (!ids.length) return [];
    const { data, error } = await getSupabaseClient().from('products')
      .select('id,title,name,daily_rate,price,currency,original_price_per_day,rating,average_rating,review_count,total_reviews,images,media,image_url,thumbnail_url,brand,description,category_id,quantity_available')
      .in('id', ids).eq('is_active', true).is('deleted_at', null).limit(100);
    if (error) throw error;
    return ((data || []) as ProductRow[]).map(mapProduct);
  }

  async addFavorite(userId: string, productId: string): Promise<void> {
    const { error } = await getSupabaseClient().from('wishlists').insert({ user_id: userId, product_id: productId });
    if (error) throw error;
  }

  async removeFavorite(userId: string, productId: string): Promise<void> {
    const { error } = await getSupabaseClient().from('wishlists').delete().eq('user_id', userId).eq('product_id', productId);
    if (error) throw error;
  }

  private getCategoryIcon(name: string): string {
    const label = name.toLowerCase();
    if (label.includes('car')) return 'Car';
    if (label.includes('bike')) return 'Bike';
    if (label.includes('furniture')) return 'Home';
    if (label.includes('electronic')) return 'Laptop';
    return 'LayoutGrid';
  }
}
