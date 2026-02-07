import type { Session } from '../../domain/entities/User';
import type { LoginDTO } from '../dtos/LoginDTO';

export interface AuthPort {
    /**
     * Initiates the login process (e.g. sending OTP)
     */
    login(dto: LoginDTO): Promise<Session>;

    /**
     * Verifies the OTP and returns a session
     */
    verifyOtp(email: string, otp: string): Promise<Session>;
    
    signUp(email: string, name: string): Promise<void>;
    
    forgotPassword(email: string): Promise<void>;
    verifyResetOtp(email: string, otp: string): Promise<boolean>;
    resetPassword(email: string, otp: string, password: string): Promise<void>;
    
    signOut(): Promise<void>;

    /**
     * Retrieves the current session if any
     */
    getSession(): Promise<Session | null>;

    /**
     * Refreshes the session token
     */
    refreshSession(refreshToken: string): Promise<Session>;
}
