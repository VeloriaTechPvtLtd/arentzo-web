import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/useAuth';
import { AuthInput } from '../components/AuthInput';

interface SignupFormProps {
    onSuccess: (email: string) => void;
    onLoginClick: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSuccess, onLoginClick }) => {
    const { t } = useTranslation();
    const { signUp, loading } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async () => {
        setError('');
        if (!name || !email || !password || !confirmPassword) {
            setError(t('auth.errors.required'));
            return;
        }
        if (password !== confirmPassword) {
            setError(t('auth.errors.passwordMismatch'));
            return;
        }

        try {
            await signUp(email, name, password);
            onSuccess(email);
        } catch {
            setError(t('auth.errors.signup'));
        }
    };

    return (
        <div className="space-y-6 pt-4">
            <div className="space-y-4">
                <AuthInput
                    label={t('auth.signup.fullName')}
                    placeholder={t('auth.signup.fullNamePlaceholder')}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <AuthInput
                    label={t('auth.signup.email')}
                    placeholder={t('auth.signup.emailPlaceholder')}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <AuthInput
                    label={t('auth.signup.password')}
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <AuthInput
                    label={t('auth.signup.confirmPassword')}
                    placeholder="••••••••"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            {error && <p className="text-sm text-destructive font-medium">{error}</p>}

            <button
                onClick={handleSignup}
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? t('auth.signup.submitting') : t('auth.signup.submit')}
            </button>

            <p className="text-center text-sm text-muted-foreground font-medium">
                {t('auth.signup.hasAccount')}{' '}
                <button
                    onClick={onLoginClick}
                    className="text-primary hover:text-primary/80 font-bold transition-colors"
                >
                    {t('auth.signup.loginLink')}
                </button>
            </p>
        </div>
    );
};
