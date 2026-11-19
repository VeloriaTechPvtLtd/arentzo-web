import type { Rental } from '../../domain/entities';

export interface RentalRepository {
  getForCustomer(customerId: string): Promise<Rental[]>;
  getCustomerRental(customerId: string, rentalId: string): Promise<Rental | null>;
}
