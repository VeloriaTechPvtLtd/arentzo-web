export interface Order {
    id: string;
    customerName: string;
    customerEmail: string;
    productName: string;
    quantity: number;
    totalAmount: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    date: string;
    image: string;
}

export const mockOrders: Order[] = [
    {
        id: 'ORD-001',
        customerName: 'Rahul Sharma',
        customerEmail: 'rahul@example.com',
        productName: 'DSLR Camera Canon EOS R5',
        quantity: 1,
        totalAmount: 145000,
        status: 'delivered',
        date: '2024-01-10T10:30:00Z',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80'
    },
    {
        id: 'ORD-002',
        customerName: 'Priya Singh',
        customerEmail: 'priya@example.com',
        productName: 'MacBook Pro 14"',
        quantity: 1,
        totalAmount: 180000,
        status: 'processing',
        date: '2024-01-11T14:20:00Z',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1082?w=500&q=80'
    },
    {
        id: 'ORD-003',
        customerName: 'Amit Patel',
        customerEmail: 'amit@example.com',
        productName: 'Sony WH-1000XM4',
        quantity: 2,
        totalAmount: 48000,
        status: 'pending',
        date: '2024-01-12T09:15:00Z',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
    },
    {
        id: 'ORD-004',
        customerName: 'Sneha Reddy',
        customerEmail: 'sneha@example.com',
        productName: 'iPhone 15 Pro',
        quantity: 1,
        totalAmount: 135000,
        status: 'shipped',
        date: '2024-01-11T18:45:00Z',
        image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&q=80'
    }
];
