import type { Session } from '../../domain/entities/User';
import type { AuthPort } from '../ports/AuthPort';
import { AuthValidationError } from '../../domain/errors/AuthErrors';
import type { LoginDTO, VerifyOtpDTO } from '../dtos/LoginDTO';

export class AuthService {
    private readonly authPort: AuthPort;

    constructor(authPort: AuthPort) {
        this.authPort = authPort;
    }

    async login(dto: LoginDTO): Promise<Session> {
        if (!dto.email) throw new AuthValidationError('Email is required');
        if (!dto.password) throw new AuthValidationError('Password is required');
        return this.authPort.login(dto);
    }

    async verifyOtp(dto: VerifyOtpDTO): Promise<Session> {
        if (!dto.email || !dto.otp) throw new AuthValidationError('Email and OTP are required');
        return this.authPort.verifyOtp(dto.email, dto.otp);
    }

    async signUp(email: string, name: string): Promise<void> {
         if (!email || !name) throw new AuthValidationError('Email and Name are required');
         return this.authPort.signUp(email, name);
    }

    async forgotPassword(email: string): Promise<void> {
        if (!email) throw new AuthValidationError('Email is required');
        return this.authPort.forgotPassword(email);
    }

    async verifyResetOtp(email: string, otp: string): Promise<boolean> {
        if (!email || !otp) throw new AuthValidationError('Email and OTP are required');
        return this.authPort.verifyResetOtp(email, otp);
    }

    async resetPassword(email: string, otp: string, password: string): Promise<void> {
        if (!email || !otp || !password) throw new AuthValidationError('All fields are required');
        return this.authPort.resetPassword(email, otp, password);
    }

    async signOut(): Promise<void> {
        return this.authPort.signOut();
    }

    async getSession(): Promise<Session | null> {
        return this.authPort.getSession();
    }
}
