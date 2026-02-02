import type { UserProfile } from '../../domain/entities';

export const mockUserProfile: UserProfile = {
    id: '1',
    name: 'Tushar Sawant',
    email: 'tusharsawant@gmail.com',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isVerified: true,
    roles: ['customer', 'service_provider'], // Added service_provider to show the role switching feature
    activeRole: 'service_provider',
};

export const mockNotificationCount = 5;
export const mockRentalsCount = 3;
