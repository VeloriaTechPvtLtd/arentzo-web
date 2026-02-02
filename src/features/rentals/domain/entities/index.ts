export type RentalStatus = 'pending' | 'ongoing' | 'upcoming' | 'completed' | 'cancelled';

export interface Rental {
    id: string;
    productName: string;
    productImage: string;
    providerName: string;
    startDate: string;
    endDate: string;
    status: RentalStatus;
    totalAmount: number;
    rentalTerm: string;
    location: string;
    orderDate: string;
}
