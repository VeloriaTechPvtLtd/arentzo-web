export interface CouponUsage {
    id: string;
    offerId: string;
    memberName: string;
    memberAvatar: string;
    discountAmount: number;
    usedAt: string;
}

export const mockCouponUsage: CouponUsage[] = [
    {
        id: 'USE-001',
        offerId: 'OFF-001',
        memberName: 'Rehman Dakait',
        memberAvatar: 'https://i.pravatar.cc/150?u=rehman',
        discountAmount: 300,
        usedAt: '2024-02-05T10:00:00Z'
    },
    {
        id: 'USE-002',
        offerId: 'OFF-001',
        memberName: 'rahul saho',
        memberAvatar: 'https://i.pravatar.cc/150?u=rahul',
        discountAmount: 300,
        usedAt: '2024-02-05T11:00:00Z'
    },
    {
        id: 'USE-003',
        offerId: 'OFF-001',
        memberName: 'sheth sampat',
        memberAvatar: 'https://i.pravatar.cc/150?u=sheth',
        discountAmount: 300,
        usedAt: '2024-02-05T12:00:00Z'
    },
    {
        id: 'USE-004',
        offerId: 'OFF-001',
        memberName: 'monika roy',
        memberAvatar: 'https://i.pravatar.cc/150?u=monika',
        discountAmount: 300,
        usedAt: '2024-02-05T13:00:00Z'
    },
    {
        id: 'USE-005',
        offerId: 'OFF-001',
        memberName: 'arjun yadav',
        memberAvatar: 'https://i.pravatar.cc/150?u=arjun',
        discountAmount: 300,
        usedAt: '2024-02-05T14:00:00Z'
    },
    {
        id: 'USE-006',
        offerId: 'OFF-001',
        memberName: 'maxin clay',
        memberAvatar: 'https://i.pravatar.cc/150?u=maxin',
        discountAmount: 300,
        usedAt: '2024-02-05T15:00:00Z'
    }
];
