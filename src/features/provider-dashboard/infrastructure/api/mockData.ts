import type { DashboardStats, ProductAnalytics, RevenueData } from '../../domain/entities/types';

export const mockDashboardStats: DashboardStats = {
    revenue: 124500,
    revenueChange: 12.5,
    views: 45200,
    viewsChange: 8.2,
    cartAdds: 1240,
    cartAddsChange: -2.4,
    favorites: 3850,
    favoritesChange: 15.3,
};

export const mockProductAnalytics: ProductAnalytics[] = [
    {
        id: '1',
        name: 'Professional DSLR Camera',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80',
        price: 1500,
        status: 'active',
        views: 1240,
        cartAdds: 45,
        favorites: 120,
        revenue: 45000,
        rating: 4.8
    },
    {
        id: '2',
        name: 'Camping Tent - 4 Person',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&q=80',
        price: 80,
        status: 'active',
        views: 3500,
        cartAdds: 120,
        favorites: 450,
        revenue: 12000,
        rating: 4.5
    },
    {
        id: '3',
        name: 'Electric Mountain Bike',
        image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=500&q=80',
        price: 2400,
        status: 'out_of_stock',
        views: 890,
        cartAdds: 12,
        favorites: 56,
        revenue: 28800,
        rating: 4.9
    }
];

export const mockRevenueHistory: RevenueData[] = [
    { label: 'Jan', value: 45000 },
    { label: 'Feb', value: 52000 },
    { label: 'Mar', value: 48000 },
    { label: 'Apr', value: 61000 },
    { label: 'May', value: 55000 },
    { label: 'Jun', value: 67000 },
    { label: 'Jul', value: 72000 },
];
