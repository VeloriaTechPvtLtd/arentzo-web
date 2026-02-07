export interface LoginDTO {
    email: string;
    password?: string;
}

export interface VerifyOtpDTO {
    email: string;
    otp: string;
}
