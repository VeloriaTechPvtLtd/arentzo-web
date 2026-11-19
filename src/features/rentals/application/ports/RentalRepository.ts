import type { Rental } from '../../domain/entities';

export interface RentalRepository {
  getForCustomer(customerId: string, offset?: number): Promise<{ items: Rental[]; nextOffset: number | null }>;
  getCustomerRental(customerId: string, rentalId: string): Promise<Rental | null>;
}
