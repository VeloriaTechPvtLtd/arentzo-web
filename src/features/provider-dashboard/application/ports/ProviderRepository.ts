import type { Order } from '../../infrastructure/api/ordersMockData';
import type { Product } from '../../infrastructure/api/productsMockData';
import type { Offer } from '../../infrastructure/api/offersMockData';

export interface ProviderRepository {
  getProducts(providerId: string): Promise<Product[]>;
  getOrders(providerId: string): Promise<Order[]>;
  getOffers(providerId: string): Promise<Offer[]>;
}
