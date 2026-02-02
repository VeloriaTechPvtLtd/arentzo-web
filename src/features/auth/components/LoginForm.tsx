import React, { useState } from 'react';
import { AuthInput } from './AuthInput';
import { AuthSocialButtons } from './AuthSocialButtons';
import { useAuth } from '../context/AuthContext';

interface LoginFormProps {
    onSwitchToSignup: () => void;
    onSwitchToForgotPassword: () => void;
    onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
    onSwitchToSignup,
    onSwitchToForgotPassword,
    onSuccess
}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate login
        console.log('Logging in with', email);
        signIn();
        if (onSuccess) onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
            <div className="space-y-6">
                <AuthInput
                    label="Email"
                    placeholder="Enter your email address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <div className="space-y-4">
                    <AuthInput
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}

                        required
                    />

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onSwitchToForgotPassword}
                            className="text-sm font-bold text-primary hover:underline bg-transparent border-none cursor-pointer px-1"
                        >
                            Forgot password?
                        </button>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <button
                    type="submit"
                    className="w-full bg-primary text-white py-4 rounded-3xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]"
                >
                    Next
                </button>

                <AuthSocialButtons dividerText="Or Continue with" />
            </div>

            <p className="text-center text-base text-muted-foreground font-medium pt-8">
                Don't have an account?{' '}
                <button
                    type="button"
                    onClick={onSwitchToSignup}
                    className="text-primary font-bold hover:underline bg-transparent border-none cursor-pointer"
                >
                    Sign up
                </button>
            </p>
        </form>
    );
};
