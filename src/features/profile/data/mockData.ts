import type { UserProfile } from '../types';

export const mockUserProfile: UserProfile = {
    id: '1',
    name: 'Tushar Sawant',
    email: 'tusharsawant@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isVerified: true,
    roles: ['customer'],
    activeRole: 'customer',
};

export const mockNotificationCount = 5;
export const mockRentalsCount = 3;
