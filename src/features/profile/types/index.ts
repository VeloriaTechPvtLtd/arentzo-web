import type { ReactNode } from 'react';

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    avatarUrl?: string;
    isVerified: boolean;
    roles: UserRole[];
    activeRole: UserRole;
}

export type UserRole = 'customer' | 'service_provider';

export interface MenuItem {
    id: string;
    icon: ReactNode;
    label: string;
    onClick?: () => void;
    href?: string;
    hasArrow?: boolean;
}

export interface MenuSection {
    title: string;
    items: MenuItem[];
}

export type ProfileView = 'profile' | 'language-theme' | 'notifications' | 'bugs';




