import { createContext } from 'react';
import type { User, Session, UserRole } from '../../domain/entities/User';

export interface AuthContextType {
    user: User | null;
    session: Session | null;
    loading: boolean;
    signIn: (email: string, password?: string) => Promise<void>;
    verifyOtp: (email: string, otp: string) => Promise<void>;
    signUp: (email: string, name: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    verifyResetOtp: (email: string, otp: string) => Promise<boolean>;
    resetPassword: (email: string, otp: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    activeRole: UserRole;
    switchRole: (role: UserRole) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
