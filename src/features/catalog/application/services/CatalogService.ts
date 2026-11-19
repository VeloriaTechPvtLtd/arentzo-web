import type { CatalogRepository } from '../ports/CatalogRepository';

export class CatalogService {
  constructor(private readonly repository: CatalogRepository) {}
  listAvailable() { return this.repository.getAvailableProducts(); }
  listCategories() { return this.repository.getCategories(); }
  listByIds(ids: string[]) { return this.repository.getProductsByIds(ids); }
  getFavoriteIds(userId: string) {
    if (!userId) return Promise.resolve([] as string[]);
    return this.repository.getFavoriteProductIds(userId);
  }
  async listFavorites(userId: string) {
    if (!userId) throw new Error('Sign in is required to view favorites.');
    const ids = await this.repository.getFavoriteProductIds(userId);
    return this.repository.getProductsByIds(ids);
  }
  async toggleFavorite(userId: string, productId: string, isSaved: boolean) {
    if (!userId) throw new Error('Sign in is required to save favorites.');
    if (isSaved) return this.repository.removeFavorite(userId, productId);
    return this.repository.addFavorite(userId, productId);
  }
}
