import type { Product } from '@/shared/types/product';
import type { Category } from '@/features/customer-home/domain/entities/types';

export interface CatalogRepository {
  getAvailableProducts(): Promise<Product[]>;
  getCategories(): Promise<Category[]>;
  getFavoriteProductIds(userId: string): Promise<string[]>;
  getProductsByIds(ids: string[]): Promise<Product[]>;
  addFavorite(userId: string, productId: string): Promise<void>;
  removeFavorite(userId: string, productId: string): Promise<void>;
}
