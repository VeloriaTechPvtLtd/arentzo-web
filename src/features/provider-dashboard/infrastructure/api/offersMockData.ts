export interface Offer {
    id: string;
    title: string;
    code: string;
    discountType: 'percentage' | 'fixed';
    discountValue: number;
    status: 'active' | 'scheduled' | 'expired' | 'draft' | 'paused';
    usageCount: number;
    startDate: string;
    endDate: string;
    applicableProductIds: string[];
    revenueGenerated: number;
    totalSales: number;
    targetAudience?: string;
    termsAndConditions?: string;
    spendingLimit?: number;
    usageLimitPerUser?: number;
    imageUrl?: string;
}

export const mockOffers: Offer[] = [
    {
        id: 'OFF-001',
        title: 'New Year Special',
        code: 'WELCOME2024',
        discountType: 'percentage',
        discountValue: 20,
        status: 'active',
        usageCount: 145,
        startDate: '2024-01-01T00:00:00Z',
        endDate: '2024-05-30T23:59:59Z',
        applicableProductIds: ['PRD-001', 'PRD-002'],
        revenueGenerated: 45000,
        totalSales: 156,
        targetAudience: 'New Customers'
    },
    {
        id: 'OFF-002',
        title: 'Flash Sale - Electronics',
        code: 'FLASH500',
        discountType: 'fixed',
        discountValue: 500,
        status: 'scheduled',
        usageCount: 0,
        startDate: '2024-06-01T00:00:00Z',
        endDate: '2024-06-15T23:59:59Z',
        applicableProductIds: ['PRD-001', 'PRD-005'],
        revenueGenerated: 0,
        totalSales: 0,
        targetAudience: 'Tech Enthusiasts'
    },
    {
        id: 'OFF-003',
        title: 'Early Winter Deals',
        code: 'WINTER15',
        discountType: 'percentage',
        discountValue: 15,
        status: 'expired',
        usageCount: 230,
        startDate: '2023-11-01T00:00:00Z',
        endDate: '2023-12-31T23:59:59Z',
        applicableProductIds: ['PRD-002'],
        revenueGenerated: 78000,
        totalSales: 245,
        targetAudience: 'Returning Customers'
    },
    {
        id: 'OFF-004',
        title: 'Premium Member Reward',
        code: 'VIPGOLD',
        discountType: 'fixed',
        discountValue: 1000,
        status: 'active',
        usageCount: 89,
        startDate: '2024-02-15T00:00:00Z',
        endDate: '2024-12-31T23:59:59Z',
        applicableProductIds: ['PRD-001', 'PRD-004', 'PRD-005'],
        revenueGenerated: 125000,
        totalSales: 98,
        targetAudience: 'VIP Members'
    },
    {
        id: 'OFF-005',
        title: 'Bounty Hunters Promo',
        code: 'BOUNTY10',
        discountType: 'percentage',
        discountValue: 10,
        status: 'draft',
        usageCount: 0,
        startDate: '2024-08-01T00:00:00Z',
        endDate: '2024-08-31T23:59:59Z',
        applicableProductIds: [],
        revenueGenerated: 0,
        totalSales: 0
    }
];
