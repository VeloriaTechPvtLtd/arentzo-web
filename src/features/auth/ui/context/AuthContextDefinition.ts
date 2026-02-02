import { createContext } from 'react';

export interface User {
    id: string;
    email?: string;
    [key: string]: unknown;
}

export interface Session {
    user: User;
    access_token: string;
    [key: string]: unknown;
}

export type UserRole = 'customer' | 'service_provider';

export interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    activeRole: UserRole;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
    switchRole: (role: UserRole) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
