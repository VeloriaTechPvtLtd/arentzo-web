import type { ProviderRepository } from '../ports/ProviderRepository';

export class ProviderService {
  constructor(private readonly repository: ProviderRepository) {}
  getProducts(providerId: string) {
    if (!providerId) throw new Error('Provider profile is required.');
    return this.repository.getProducts(providerId);
  }
  getOrders(providerId: string) {
    if (!providerId) throw new Error('Provider profile is required.');
    return this.repository.getOrders(providerId);
  }
  getOffers(providerId: string) {
    if (!providerId) throw new Error('Provider profile is required.');
    return this.repository.getOffers(providerId);
  }
}
