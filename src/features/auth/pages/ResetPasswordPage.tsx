import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle } from 'lucide-react';
import { AuthLayout } from '../layouts/AuthLayout';
import { AuthInput } from '../components/AuthInput';

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

    const LockIcon = () => (
        <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
            {/* Same lock icon as forgot password, but static */}
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
        </div>
    );

    return (
        <AuthLayout
            showLogo={false}
            headerIcon={<LockIcon />}
            title="Create New Password"
            subtitle="Your new password must be different from the previous password"
        >
            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-5">
                    <AuthInput
                        label="New Password"
                        type="password"
                        placeholder="Enter your new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        showPasswordToggle={true}
                    />

                    <AuthInput
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm your new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        showPasswordToggle={true}
                    />

                    <div className="space-y-3 pt-2">
                        {requirements.map((req, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-sm font-medium">
                                {req.met ? (
                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                ) : (
                                    <Circle className="w-5 h-5 text-muted-foreground/30" />
                                )}
                                <span className={req.met ? 'text-[#2d2d2d]' : 'text-muted-foreground'}>
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
                        className="w-full bg-primary text-primary-foreground py-5 rounded-3xl font-bold text-xl hover:bg-primary/90 transition-all flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed"
                    >
                        Reset Password
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
