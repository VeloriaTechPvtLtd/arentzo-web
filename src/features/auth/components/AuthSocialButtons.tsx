import React from 'react';

export const GoogleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M44.5 20H24V29H35.8C34.7 33.9 30.1 37 24 37C16.8 37 11 31.2 11 24C11 16.8 16.8 11 24 11C27.2 11 30.2 12.2 32.5 14.3L39.1 7.7C35.1 4 29.8 2 24 2C11.8 2 2 11.8 2 24C2 36.2 11.8 46 24 46C36.2 46 46 36.2 46 24C46 22.6 45.8 21.3 45.5 20H44.5Z" fill="#FFC107" />
        <path d="M6.30005 14.7L14.1 20.2C16.1 15.5 20.7 12.2 26 12.2C29.3 12.2 32.3 13.4 34.6 15.4L41.3 8.7C37.3 5 32 2.8 26 2.8C17.6 2.8 10.3 7.7 6.30005 14.7Z" fill="#FF3D00" />
        <path d="M24 46C31.2 46 37.5 42.6 41.5 37.2L34.1 31.1C31.5 33.3 28 34.7 24 34.7C18.2 34.7 13.3 30.9 11.5 25.7L3.7 31.7C7.6 40.2 15.2 46 24 46Z" fill="#4CAF50" />
        <path d="M45.5 20H44.5V24C44.5 24.1 44.5 24.2 44.5 24.3L44.5 24.3C44.5 30.4 41.6 35.8 37.2 39.2L44.6 45.3C50.2 40.2 53.8 32.7 53.8 24.3C53.8 22.8 53.6 21.4 53.3 20H45.5Z" fill="#1976D2" />
    </svg>
);

export const FacebookIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.248h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);

export const AppleIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.05 20.28c-.96.95-2.22 1.43-3.77 1.43-1.12 0-2.15-.25-3.08-.75-.93-.49-1.63-.49-2.52 0-.97.53-2.01.81-3.13.81-1.74 0-3.18-.7-4.32-2.11C-.23 17.5 0 13.9 0 13.9c.77-5.02 4.05-7.79 7.63-7.79 1.25 0 2.37.33 3.39.99 1.02.66 1.62.66 2.63 0 1.13-.74 2.4-1.12 3.84-1.12 2.16 0 3.96.88 5.4 2.65-1.14.77-2.01 1.8-2.61 3.09-.6 1.29-.6 2.61 0 3.96.53 1.18 1.3 2.13 2.31 2.85-.29.83-.8 1.58-1.54 2.25zM12.03 5.42c-.11-1.42.36-2.74 1.41-3.96h.05c1.45.05 2.72.63 3.82 1.74.1.13.1.2.1.2-.1.14-.1.14-.1.14-1.29 1.42-2.8 2.13-4.52 2.13-.42 0-.6-.04-.76-.25z" />
    </svg>
);

interface AuthSocialButtonsProps {
    dividerText?: string;
}

export const AuthSocialButtons: React.FC<AuthSocialButtonsProps> = ({
    dividerText = "Or Continue with"
}) => {
    return (
        <div className="space-y-6">
            <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#f2f2f2]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-background px-4 font-medium text-muted-foreground/60">{dividerText}</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <button className="flex items-center justify-center p-4 bg-white border border-[#f2f2f2] rounded-2xl hover:bg-secondary/20 transition-all shadow-sm active:scale-95">
                    <GoogleIcon />
                </button>
                <button className="flex items-center justify-center p-4 bg-white border border-[#f2f2f2] rounded-2xl hover:bg-secondary/20 transition-all shadow-sm active:scale-95">
                    <FacebookIcon />
                </button>
                <button className="flex items-center justify-center p-4 bg-white border border-[#f2f2f2] rounded-2xl hover:bg-secondary/20 transition-all shadow-sm active:scale-95">
                    <AppleIcon />
                </button>
            </div>
        </div>
    );
};
