import type { AuthPort } from '../../application/ports/AuthPort';
import type { Session, User } from '../../domain/entities/User';
import type { LoginDTO } from '../../application/dtos/LoginDTO';
import { AuthError } from '../../domain/errors/AuthErrors';

const STORAGE_KEY_SESSION = 'arentzo_auth_session';

export class MockAuthAdapter implements AuthPort {
    async login(dto: LoginDTO): Promise<Session> {
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return this.createMockSession(dto.email);
    }

    async verifyOtp(email: string, otp: string): Promise<Session> {
        // mock verification logic (replace with real OTP provider)
        await new Promise(resolve => setTimeout(resolve, 500)); // Keep original delay

        // Mock verification logic
        if (otp === '123456') {
             return this.createMockSession(email);
        }
        throw new AuthError('Invalid OTP');
    }

    async signUp(_email: string, _name: string): Promise<void> {
        // mock signup — wire to Supabase auth.signUp
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return Promise.resolve();
    }

    async forgotPassword(_email: string): Promise<void> {
        // mock forgot-password — wire to Supabase auth.resetPasswordForEmail
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return Promise.resolve();
    }

    async verifyResetOtp(_email: string, otp: string): Promise<boolean> {
        // mock OTP verification
        await new Promise(resolve => setTimeout(resolve, 600));
        return otp === '123456';
    }

    async resetPassword(_email: string, otp: string, _password: string): Promise<void> {
        // mock password reset — wire to Supabase auth.updateUserById
        await new Promise(resolve => setTimeout(resolve, 800));
        if (otp !== '123456') throw new AuthError('Invalid or expired session');
        return Promise.resolve();
    }

    private createMockSession(email: string): Session {
        // Create Mock Session
        const user: User = {
            id: 'mock-user-1',
            email: email,
            role: 'customer',
            name: 'Demo User',
            avatarUrl: 'https://i.pravatar.cc/150?u=mock-user-1'
        };

        const session: Session = {
            user,
            accessToken: 'mock-access-token-' + Date.now(),
            refreshToken: 'mock-refresh-token-' + Date.now(),
            expiresAt: Date.now() + 3600 * 1000 // 1 hour
        };

        this.persistSession(session);
        return session;
    }

    async signOut(): Promise<void> {
        // mock signOut — wire to Supabase auth.signOut
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        try {
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(STORAGE_KEY_SESSION);
            }
        } catch {
            // ignore
        }
    }

    async getSession(): Promise<Session | null> {
        try {
            if (typeof window === 'undefined') return null;
            const stored = window.localStorage.getItem(STORAGE_KEY_SESSION);
            if (!stored) return null;
            return JSON.parse(stored) as Session;
        } catch {
            return null;
        }
    }

    async refreshSession(_refreshToken: string): Promise<Session> {
        const current = await this.getSession();
        if (!current) throw new Error('No session to refresh');
        // Just return existing for mock
        return current;
    }

    private persistSession(session: Session) {
        try {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
            }
        } catch {
            // ignore
        }
    }
}
