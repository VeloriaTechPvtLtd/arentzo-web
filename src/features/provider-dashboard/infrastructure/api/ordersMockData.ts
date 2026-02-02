export interface Order {
    id: string;
    customerName: string;
    customerEmail: string;
    productName: string;
    quantity: number;
    totalAmount: number;
    rentalStatus: 'requested' | 'approved' | 'booked' | 'active' | 'overdue' | 'returned' | 'completed' | 'cancelled';
    paymentStatus: 'paid' | 'pending' | 'refunded';
    deliveryMethod: 'pickup' | 'delivery';
    depositStatus: 'held' | 'refunded' | 'deducted' | 'n/a';
    startDate: string;
    returnDate: string;
    image: string;
}

export const mockOrders: Order[] = [
    {
        id: 'RNT-001',
        customerName: 'Rahul Sharma',
        customerEmail: 'rahul@example.com',
        productName: 'DSLR Camera Canon EOS R5',
        quantity: 1,
        totalAmount: 4500, // Rental for 3 days
        rentalStatus: 'active',
        paymentStatus: 'paid',
        deliveryMethod: 'pickup',
        depositStatus: 'held',
        startDate: '2024-01-12T10:00:00Z',
        returnDate: '2024-01-15T10:00:00Z',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80'
    },
    {
        id: 'RNT-002',
        customerName: 'Priya Singh',
        customerEmail: 'priya@example.com',
        productName: 'MacBook Pro 14"',
        quantity: 1,
        totalAmount: 12000,
        rentalStatus: 'booked',
        paymentStatus: 'paid',
        deliveryMethod: 'delivery',
        depositStatus: 'held',
        startDate: '2024-01-16T09:00:00Z',
        returnDate: '2024-01-20T09:00:00Z',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1082?w=500&q=80'
    },
    {
        id: 'RNT-003',
        customerName: 'Amit Patel',
        customerEmail: 'amit@example.com',
        productName: 'Sony WH-1000XM4',
        quantity: 1,
        totalAmount: 800,
        rentalStatus: 'overdue',
        paymentStatus: 'paid',
        deliveryMethod: 'pickup',
        depositStatus: 'held',
        startDate: '2024-01-05T10:00:00Z',
        returnDate: '2024-01-08T10:00:00Z',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
    },
    {
        id: 'RNT-004',
        customerName: 'Sneha Reddy',
        customerEmail: 'sneha@example.com',
        productName: 'Camping Tent',
        quantity: 1,
        totalAmount: 1500,
        rentalStatus: 'completed',
        paymentStatus: 'paid',
        deliveryMethod: 'delivery',
        depositStatus: 'refunded',
        startDate: '2024-01-01T08:00:00Z',
        returnDate: '2024-01-03T20:00:00Z',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&q=80'
    },
    {
        id: 'RNT-005',
        customerName: 'Vikram Malhotra',
        customerEmail: 'vikram@example.com',
        productName: 'Electric Bike',
        quantity: 2,
        totalAmount: 6000,
        rentalStatus: 'cancelled',
        paymentStatus: 'refunded',
        deliveryMethod: 'pickup',
        depositStatus: 'refunded',
        startDate: '2024-01-10T10:00:00Z',
        returnDate: '2024-01-11T10:00:00Z',
        image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500&q=80'
    },
    {
        id: 'RNT-006',
        customerName: 'Arjun Das',
        customerEmail: 'arjun@example.com',
        productName: 'GoPro Hero 11',
        quantity: 1,
        totalAmount: 2500,
        rentalStatus: 'requested',
        paymentStatus: 'pending',
        deliveryMethod: 'delivery',
        depositStatus: 'n/a',
        startDate: '2024-01-25T10:00:00Z',
        returnDate: '2024-01-28T10:00:00Z',
        image: 'https://images.unsplash.com/photo-1695217997327-14207914979e?w=500&q=80'
    },
    {
        id: 'RNT-007',
        customerName: 'Meera K',
        customerEmail: 'meera@example.com',
        productName: 'Projector 4K',
        quantity: 1,
        totalAmount: 3000,
        rentalStatus: 'approved',
        paymentStatus: 'pending',
        deliveryMethod: 'pickup',
        depositStatus: 'n/a',
        startDate: '2024-01-22T14:00:00Z',
        returnDate: '2024-01-23T10:00:00Z',
        image: 'https://images.unsplash.com/photo-1535016120720-40c6874c3b1c?w=500&q=80'
    },
    {
        id: 'RNT-008',
        customerName: 'Sanjay Kumar',
        customerEmail: 'sanjay@example.com',
        productName: 'PS5 Console',
        quantity: 1,
        totalAmount: 2000,
        rentalStatus: 'returned',
        paymentStatus: 'paid',
        deliveryMethod: 'pickup',
        depositStatus: 'held',
        startDate: '2024-01-12T10:00:00Z',
        returnDate: '2024-01-14T10:00:00Z',
        image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500&q=80'
    }
];
