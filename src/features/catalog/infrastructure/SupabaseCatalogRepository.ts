import type { Product } from '@/shared/types/product';
import type { CatalogRepository } from '../application/ports/CatalogRepository';
import type { Category } from '@/features/customer-home/domain/entities/types';
import { getSupabaseClient } from '@/shared/infrastructure/supabase/client';
import { mapAdditionalChargeDisclosure } from '../domain/additionalChargeDisclosure.js';

type ProductRow = {
  id: string; title: string | null; name: string | null; daily_rate: number | null; discounted_rate_per_day: number | null;
  price: number | null; currency: string | null; original_price_per_day: number | null; rating: number | null;
  average_rating: number | null; review_count: number | null; total_reviews: number | null;
  images: string[] | null; media: unknown; image_url: string | null; thumbnail_url: string | null;
  brand: string | null; description: string | null; category_id: string | null; quantity_available: number | null;
  subcategory_id?: string | null; pricing_rules?: unknown; usage_limits?: unknown; specifications?: unknown;
};
type CategoryRow = { id: string; name: string; icon: string | null; image_url: string | null };

function mediaUrls(value: unknown): string[] {
  const values = Array.isArray(value)
    ? value
    : value && typeof value === 'object' && Array.isArray((value as { images?: unknown }).images)
      ? (value as { images: unknown[] }).images
      : value && typeof value === 'object' && 'url' in value
        ? [value]
        : [];
  return values.flatMap((item) => {
    if (typeof item === 'string') return [item];
    if (!item || typeof item !== 'object') return [];
    const media = item as Record<string, unknown>;
    const url = media.url ?? media.large_url ?? media.medium_url ?? media.thumbnail_url;
    return typeof url === 'string' && url.length > 0 ? [url] : [];
  });
}

function imageList(row: ProductRow): string[] {
  return [...mediaUrls(row.images), ...mediaUrls(row.media), row.image_url, row.thumbnail_url]
    .filter((item): item is string => Boolean(item))
    .filter((item, index, items) => items.indexOf(item) === index);
}

function mapProduct(row: ProductRow, subcategoryAttributes: string[] = []): Product {
  const images = imageList(row);
  const price = [row.discounted_rate_per_day, row.daily_rate, row.price, row.original_price_per_day]
    .find((value) => typeof value === 'number' && Number.isFinite(value) && value > 0) ?? 0;
  const originalPrice = Number(row.original_price_per_day ?? 0);
  return {
    id: row.id, name: row.title || row.name || 'Rental item', image: images[0] || '/placeholder.svg', images,
    price, currency: row.currency || 'INR', originalPrice: originalPrice > price ? originalPrice : undefined,
    rating: Number(row.average_rating ?? row.rating ?? 0), reviewCount: Number(row.total_reviews ?? row.review_count ?? 0),
    isAvailable: (row.quantity_available ?? 0) > 0, quantity: 0, brand: row.brand || undefined,
    category: row.category_id || undefined, overview: row.description || undefined,
    additionalChargeDisclosures: mapAdditionalChargeDisclosure({
      attributes: subcategoryAttributes,
      specifications: row.specifications,
      pricingRules: row.pricing_rules,
      usageLimits: row.usage_limits,
    }),
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
    const rows: ProductRow[] = [];
    for (let offset = 0; ; offset += 20) {
      const { data, error } = await getSupabaseClient().from('products')
        .select('id,title,name,daily_rate,discounted_rate_per_day,price,currency,original_price_per_day,rating,average_rating,review_count,total_reviews,images,media,image_url,thumbnail_url,brand,description,category_id,quantity_available,created_at')
        .eq('is_active', true).is('deleted_at', null).order('created_at', { ascending: false }).range(offset, offset + 19);
      if (error) throw error;
      const page = (data || []) as ProductRow[];
      rows.push(...page);
      if (page.length < 20) break;
    }
    return rows.map((row) => mapProduct(row));
  }

  async getFavoriteProductIds(userId: string): Promise<string[]> {
    const { data, error } = await getSupabaseClient().from('favourites').select('product_id').eq('user_id', userId);
    if (error) throw error;
    return (data || []).map((row) => row.product_id).filter((id): id is string => Boolean(id));
  }

  async getProductsByIds(ids: string[]): Promise<Product[]> {
    if (!ids.length) return [];
    const { data, error } = await getSupabaseClient().from('products')
      .select('id,title,name,daily_rate,discounted_rate_per_day,price,currency,original_price_per_day,rating,average_rating,review_count,total_reviews,images,media,image_url,thumbnail_url,brand,description,category_id,quantity_available,subcategory_id,pricing_rules,usage_limits,specifications')
      .in('id', ids).eq('is_active', true).is('deleted_at', null).limit(100);
    if (error) throw error;
    const products = (data || []) as ProductRow[];
    const subcategoryIds = [...new Set(products.map((product) => product.subcategory_id).filter((id): id is string => Boolean(id)))];
    const attributesBySubcategory = new Map<string, string[]>();
    if (subcategoryIds.length) {
      try {
        const { data: attributes } = await getSupabaseClient().from('subcategory_attributes')
          .select('subcategory_id,attribute_key').in('subcategory_id', subcategoryIds);
        for (const attribute of attributes || []) {
          if (typeof attribute.subcategory_id !== 'string' || typeof attribute.attribute_key !== 'string') continue;
          attributesBySubcategory.set(attribute.subcategory_id, [
            ...(attributesBySubcategory.get(attribute.subcategory_id) || []),
            attribute.attribute_key,
          ]);
        }
      } catch {
        // Keep product detail usable if public capability metadata is unavailable.
        // Only common configured fields can be disclosed without this mapping.
      }
    }
    return products.map((product) => mapProduct(product, attributesBySubcategory.get(product.subcategory_id || '') || []));
  }

  async addFavorite(userId: string, productId: string): Promise<void> {
    const { error } = await getSupabaseClient().from('favourites').insert({ user_id: userId, product_id: productId });
    if (error) throw error;
  }

  async removeFavorite(userId: string, productId: string): Promise<void> {
    const { error } = await getSupabaseClient().from('favourites').delete().eq('user_id', userId).eq('product_id', productId);
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
