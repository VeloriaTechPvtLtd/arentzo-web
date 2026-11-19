import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/useAuth';
import { AuthInput } from '../components/AuthInput';
import { Check } from 'lucide-react';

interface LoginFormProps {
    onSuccess: (email: string) => void;
    onSignupClick: () => void;
    onForgotPasswordClick: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSignupClick, onForgotPasswordClick }) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const { signIn, loading } = useAuth();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError('');
        if (!email || !password) {
            setError(t('auth.errors.required'));
            return;
        }
        try {
            await signIn(email, password);
            onSuccess(email);
        } catch {
            setError(t('auth.errors.login'));
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-6 pt-4">
            <div className="space-y-4">
                <AuthInput
                    label={t('auth.login.email')}
                    placeholder={t('auth.login.emailPlaceholder')}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                />

                <div className="space-y-2">
                    <AuthInput
                        label={t('auth.login.password')}
                        placeholder="••••••••"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        error={error}
                    />

                    <div className="flex items-center justify-between px-1">
                        <label className="flex items-center space-x-2 cursor-pointer group select-none">
                            <div className="relative flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="peer sr-only"
                                />
                                <div className="w-4 h-4 border-2 border-muted-foreground/30 rounded-[3px] bg-background transition-all duration-200
                                    peer-focus:ring-2 peer-focus:ring-primary/20 peer-focus:border-primary
                                    peer-checked:bg-primary peer-checked:border-primary
                                    peer-checked:[&_svg]:opacity-100
                                    group-hover:border-primary/50">
                                    <Check className="w-3 h-3 text-primary-foreground opacity-0 transition-opacity duration-200 stroke-[3]" />
                                </div>
                            </div>
                            <span className="text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">{t('auth.login.remember')}</span>
                        </label>
                        <button
                            type="button"
                            onClick={onForgotPasswordClick}
                            className="text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                        >
                            {t('auth.login.forgot')}
                        </button>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? t('auth.login.submitting') : t('auth.login.submit')}
            </button>

            <p className="text-center text-sm text-muted-foreground font-medium">
                {t('auth.login.noAccount')}{' '}
                <button
                    type="button"
                    onClick={onSignupClick}
                    className="text-primary hover:text-primary/80 font-bold transition-colors"
                >
                    {t('auth.login.signupLink')}
                </button>
            </p>
        </form>
    );
};
