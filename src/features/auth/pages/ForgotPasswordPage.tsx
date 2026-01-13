import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { AuthInput } from '../components/AuthInput';
import { ShieldCheck, ArrowLeft, Mail } from 'lucide-react';

const HeaderIcon = () => (
    <div className="relative">
        <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center animate-pulse">
            <Mail className="w-10 h-10 text-primary" />
        </div>
        <div className="absolute -top-2 -right-2 bg-background p-1.5 rounded-full shadow-lg border border-border">
            <ShieldCheck className="w-5 h-5 text-primary" />
        </div>
    </div>
);

export const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);

        setTimeout(() => {
            navigate('/verify-otp', { state: { email } });
        }, 2000);
    };

    return (
        <AuthLayout
            showLogo={true}
            headerIcon={<HeaderIcon />}
            title="Reset password"
            subtitle="Enter your email address and we'll send you a recovery link to get back into your account."
            imageSrc="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=2000" // Premium residential complex
        >
            <form onSubmit={handleSubmit} className="space-y-8 mt-4">
                <div className="space-y-4">
                    <AuthInput
                        label="Email Address"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="john@example.com"
                        autoComplete="email"
                    />
                </div>

                <div className="space-y-6">
                    {isSubmitted && (
                        <div className="flex justify-center animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <div className="bg-green-500/10 border border-green-500/20 text-green-600 px-6 py-4 rounded-2xl text-sm font-bold flex items-center space-x-2">
                                <ShieldCheck className="w-5 h-5" />
                                <span>Recovery link sent successfully!</span>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isSubmitted}
                    >
                        {isSubmitted ? 'Redirecting...' : 'Send reset link'}
                    </button>

                    <div className="text-center pt-2">
                        <Link to="/login" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors group">
                            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                            Back to log in
                        </Link>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
};
