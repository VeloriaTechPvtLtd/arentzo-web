import React, { useState } from 'react';
import { AuthInput } from './AuthInput';

interface ForgotPasswordFormProps {
    onSwitchToLogin: () => void;
    onSuccess?: (email: string) => void;
}

const LockIcon = () => (
    <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center relative mx-auto mb-4">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
    </div>
);

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onSwitchToLogin, onSuccess }) => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Sending OTP to', email);
        setIsSubmitted(true);
        setTimeout(() => {
            if (onSuccess) onSuccess(email);
        }, 1500);
    };

    return (
        <div className="p-6 space-y-10">
            <header className="text-center">
                <LockIcon />
                <p className="text-sm text-muted-foreground mt-2">
                    Enter your email address and we'll send you a one-time password (OTP) to proceed
                </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-8">
                <AuthInput
                    label="Enter Email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                />

                {isSubmitted && (
                    <div className="flex justify-center">
                        <div className="bg-[#b1b1b1] text-white px-6 py-3 rounded-full text-xs font-medium animate-in fade-in zoom-in duration-300">
                            OTP has been sent successfully
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-4 rounded-3xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
                    disabled={isSubmitted}
                >
                    Send OTP
                </button>

                <div className="text-center">
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        className="text-primary font-bold text-base hover:underline bg-transparent border-none cursor-pointer"
                    >
                        Back to Login
                    </button>
                </div>
            </form>
        </div>
    );
};
