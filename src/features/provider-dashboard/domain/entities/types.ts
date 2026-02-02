export type TimePeriod = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface DashboardStats {
    revenue: number;
    revenueChange: number;
    views: number;
    viewsChange: number;
    cartAdds: number;
    cartAddsChange: number;
    favorites: number;
    favoritesChange: number;
}

export interface ProductAnalytics {
    id: string;
    name: string;
    image: string;
    price: number;
    status: 'active' | 'out_of_stock' | 'draft';
    views: number;
    cartAdds: number;
    favorites: number;
    revenue: number;
    rating: number;
}

export interface RevenueData {
    label: string;
    value: number;
}
