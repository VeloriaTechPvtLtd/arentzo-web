import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { AuthInput } from '../components/AuthInput';

interface ForgotPasswordFormProps {
    onBack: () => void;
    onSuccess?: () => void;
    onEmailSet?: (email: string) => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onBack, onSuccess, onEmailSet }) => {
    const { forgotPassword, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [sent, setSent] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        setError('');
        if (!email) {
            setError('Email is required');
            return;
        }

        try {
            if (onEmailSet) onEmailSet(email);
            await forgotPassword(email);
            if (onSuccess) {
                onSuccess();
            } else {
                setSent(true);
            }
        } catch (err) {
            console.error(err);
            setError('Failed to send reset link');
        }
    };

    if (sent) {
        return (
            <div className="text-center space-y-6 pt-10 px-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-3xl">
                    📧
                </div>
                <h3 className="text-xl font-bold text-foreground">Check your email</h3>
                <p className="text-muted-foreground">
                    We have sent a password reset link to <span className="font-semibold text-foreground">{email}</span>
                </p>
                <button
                    onClick={onBack}
                    className="w-full bg-secondary text-secondary-foreground py-3 rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
                >
                    Back to Login
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 pt-4">
            <p className="text-sm text-muted-foreground">
                Enter your email address and we'll send you a link to reset your password.
            </p>

            <div className="space-y-4">
                <AuthInput
                    label="Email Address"
                    placeholder="name@company.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={error}
                />
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
        </div>
    );
};
