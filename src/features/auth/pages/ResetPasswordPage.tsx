import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, KeyRound, ArrowLeft } from 'lucide-react';
import { AuthLayout } from '../layouts/AuthLayout';
import { AuthInput } from '../components/AuthInput';

const HeaderIcon = () => (
    <div className="relative">
        <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center">
            <KeyRound className="w-10 h-10 text-primary" />
        </div>
        <div className="absolute -top-2 -right-2 bg-background p-1.5 rounded-full shadow-lg border border-border">
            <CheckCircle2 className="w-5 h-5 text-primary" />
        </div>
    </div>
);

export const ResetPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const requirements = [
        { label: 'Minimum 8 characters', met: password.length >= 8 },
        { label: 'At least one uppercase letter', met: /[A-Z]/.test(password) },
        { label: 'At least one number', met: /\d/.test(password) },
        { label: 'At least one special character', met: /[^A-Za-z0-9]/.test(password) },
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const allMet = requirements.every(req => req.met);
        if (allMet && password === confirmPassword) {
            navigate('/password-reset-success');
        }
    };

    return (
        <AuthLayout
            showLogo={true}
            headerIcon={<HeaderIcon />}
            title="Secure password"
            subtitle="To secure your account, please choose a strong password that you haven't used before."
            imageSrc="https://images.unsplash.com/photo-1549517045-bc93de075e53?auto=format&fit=crop&q=80&w=2000" // Premium residential neighborhood
        >
            <form onSubmit={handleSubmit} className="space-y-8 mt-6">
                <div className="space-y-5">
                    <AuthInput
                        label="New Password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                    />

                    <AuthInput
                        label="Confirm New Password"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4 pt-2">
                        {requirements.map((req, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                {req.met ? (
                                    <div className="bg-primary/10 p-1 rounded-full">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                    </div>
                                ) : (
                                    <div className="bg-muted p-1 rounded-full">
                                        <Circle className="w-4 h-4 text-muted-foreground/30" />
                                    </div>
                                )}
                                <span className={`text-xs font-bold transition-colors ${req.met ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {req.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    <button
                        type="submit"
                        disabled={!requirements.every(req => req.met) || password !== confirmPassword}
                        className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                    >
                        Reset password
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
