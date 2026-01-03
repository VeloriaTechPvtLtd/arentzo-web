import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { AuthInput } from '../components/AuthInput';

export const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate sending OTP
        console.log('Sending OTP to', email);
        setIsSubmitted(true);

        // After showing success message for a bit, navigate to verify OTP
        setTimeout(() => {
            navigate('/verify-otp', { state: { email } });
        }, 1500);
    };

    const LockIcon = () => (
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center relative">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <div className="absolute inset-0 border-4 border-white/20 rounded-full border-t-white animate-spin-slow"></div>
        </div>
    );

    return (
        <AuthLayout
            showLogo={false}
            headerIcon={<LockIcon />}
            title="Forgot Password"
            subtitle="Enter your email address and we'll send you a one-time password (OTP) to proceed"
        >
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                    <AuthInput
                        label="Enter Email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                    />
                </div>

                <div className="space-y-6">
                    {isSubmitted && (
                        <div className="flex justify-center">
                            <div className="bg-[#b1b1b1] text-white px-6 py-3 rounded-full text-sm font-medium animate-in fade-in zoom-in duration-300">
                                OTP has been sent to successfully
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground py-5 rounded-3xl font-bold text-xl hover:bg-primary/90 transition-all flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
                        disabled={isSubmitted}
                    >
                        Send OTP
                    </button>

                    <div className="text-center">
                        <Link to="/login" className="text-primary font-bold text-lg hover:underline transition-all">
                            Back to Login
                        </Link>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
};
