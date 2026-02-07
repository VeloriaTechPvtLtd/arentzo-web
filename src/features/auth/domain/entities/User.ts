export type UserRole = 'customer' | 'service_provider';

export interface User {
    id: string;
    email: string;
    role: UserRole;
    name?: string;
    avatarUrl?: string;
}

export interface Session {
    user: User;
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
}
