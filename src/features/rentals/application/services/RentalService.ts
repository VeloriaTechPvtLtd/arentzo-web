import type { RentalRepository } from '../ports/RentalRepository';

export class RentalService {
  constructor(private readonly rentals: RentalRepository) {}
  listForCustomer(customerId: string, offset = 0) {
    if (!customerId) throw new Error('Sign in is required to view rentals.');
    return this.rentals.getForCustomer(customerId, offset);
  }
  getForCustomer(customerId: string, rentalId: string) {
    if (!customerId || !rentalId) throw new Error('A customer and rental are required.');
    return this.rentals.getCustomerRental(customerId, rentalId);
  }
}
