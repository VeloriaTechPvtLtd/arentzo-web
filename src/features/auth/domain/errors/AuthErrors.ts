export class AuthError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'AuthError';
    }
}

export class AuthValidationError extends AuthError {
    constructor(message: string) {
        super(message);
        this.name = 'AuthValidationError';
    }
}

export class InvalidCredentialsError extends AuthError {
    constructor() {
        super('Invalid email or password');
        this.name = 'InvalidCredentialsError';
    }
}

export class InvalidOtpError extends AuthError {
    constructor() {
        super('Invalid OTP code');
        this.name = 'InvalidOtpError';
    }
}

export class UserNotFoundError extends AuthError {
    constructor() {
        super('User not found');
        this.name = 'UserNotFoundError';
    }
}
