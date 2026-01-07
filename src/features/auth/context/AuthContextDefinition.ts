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

export interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
