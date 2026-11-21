export interface Product {
    sourceStatus?: string;
    verificationStatus?: string;
    visibility?: string;
    activeFlag?: boolean | null;
    hasDailyRate?: boolean;
    id: string;
    name: string;
    category: string;
    price: number;
    currency?: string;
    stock: number;
    status: 'active' | 'out_of_stock' | 'draft' | 'archived';
    condition: 'new' | 'like_new' | 'good' | 'fair';
    rating: number;
    views: number;
    revenue: number;
    image: string;
}

export const mockProducts: Product[] = [
    {
        id: 'PRD-001',
        name: 'Professional DSLR Camera Canon EOS R5',
        category: 'Electronics',
        price: 1500,
        stock: 5,
        status: 'active',
        condition: 'like_new',
        rating: 4.8,
        views: 1240,
        revenue: 45000,
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80'
    },
    {
        id: 'PRD-002',
        name: 'Camping Tent - 4 Person Waterproof',
        category: 'Outdoors',
        price: 80,
        stock: 12,
        status: 'active',
        condition: 'good',
        rating: 4.5,
        views: 3500,
        revenue: 12000,
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&q=80'
    },
    {
        id: 'PRD-003',
        name: 'Electric Mountain Bike Specialized Turbo',
        category: 'Sports',
        price: 2400,
        stock: 0,
        status: 'out_of_stock',
        condition: 'new',
        rating: 4.9,
        views: 890,
        revenue: 28800,
        image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500&q=80'
    },
    {
        id: 'PRD-004',
        name: 'Premium Leather Sofa - 3 Seater',
        category: 'Furniture',
        price: 1200,
        stock: 3,
        status: 'active',
        condition: 'fair',
        rating: 4.7,
        views: 2100,
        revenue: 36000,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80'
    },
    {
        id: 'PRD-005',
        name: 'MacBook Pro 14" M3 Chip',
        category: 'Electronics',
        price: 1800,
        stock: 8,
        status: 'active',
        condition: 'new',
        rating: 5.0,
        views: 4200,
        revenue: 144000,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1082?w=500&q=80'
    },
    {
        id: 'PRD-006',
        name: 'Smart Watching Series 9',
        category: 'Electronics',
        price: 399,
        stock: 25,
        status: 'draft',
        condition: 'new',
        rating: 0,
        views: 0,
        revenue: 0,
        image: 'https://images.unsplash.com/photo-1544117518-30df57809b11?w=500&q=80'
    }
];
