import type { AuthPort } from '../../application/ports/AuthPort';
import type { Session, User } from '../../domain/entities/User';
import type { LoginDTO } from '../../application/dtos/LoginDTO';
import { AuthError } from '../../domain/errors/AuthErrors';

const STORAGE_KEY_SESSION = 'arentzo_auth_session';

export class MockAuthAdapter implements AuthPort {
    async login(dto: LoginDTO): Promise<Session> {
        console.log(`[MockAuth] Logging in user: ${dto.email}`);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return this.createMockSession(dto.email);
    }

    async verifyOtp(email: string, otp: string): Promise<Session> {
        console.log(`[MockAuthAdapter] Verifying OTP for ${email}: ${otp}`);
        await new Promise(resolve => setTimeout(resolve, 500)); // Keep original delay

        // Mock verification logic
        if (otp === '123456') {
             return this.createMockSession(email);
        }
        throw new AuthError('Invalid OTP');
    }

    async signUp(email: string, name: string): Promise<void> {
        console.log(`[MockAuthAdapter] Signing up user: ${email}, Name: ${name}`);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return Promise.resolve();
    }

    async forgotPassword(email: string): Promise<void> {
        console.log(`[MockAuthAdapter] Sending password reset email to: ${email}`);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return Promise.resolve();
    }

    async verifyResetOtp(email: string, otp: string): Promise<boolean> {
        console.log(`[MockAuthAdapter] Verifying Reset OTP for ${email}: ${otp}`);
        await new Promise(resolve => setTimeout(resolve, 600));
        return otp === '123456';
    }

    async resetPassword(email: string, otp: string, password: string): Promise<void> {
        console.log(`[MockAuthAdapter] Resetting password for ${email} with OTP ${otp} to new password length ${password.length}`);
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
        console.log('[MockAuthAdapter] Signing out');
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        localStorage.removeItem(STORAGE_KEY_SESSION);
    }

    async getSession(): Promise<Session | null> {
        const stored = localStorage.getItem(STORAGE_KEY_SESSION);
        if (!stored) return null;
        try {
            return JSON.parse(stored) as Session;
        } catch (e) {
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
        localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
    }
}
