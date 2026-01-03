import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { AuthInput } from '../components/AuthInput';
import { AuthSocialButtons } from '../components/AuthSocialButtons';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <AuthLayout
            title="Log in"
            subtitle="Enter the credentials to access your account"
        >
            <div className="space-y-6">
                <div className="space-y-5">
                    <AuthInput
                        label="Email"
                        placeholder="Enter your email address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <AuthInput
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        showPasswordToggle={true}
                    />

                    <div className="flex justify-end">
                        <Link to="/forgot-password" title="Coming soon!" className="text-sm font-bold text-primary hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                </div>

                <button
                    className="w-full bg-primary text-primary-foreground py-5 rounded-3xl font-bold text-xl hover:bg-primary/90 transition-all flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]"
                >
                    Next
                </button>

                <AuthSocialButtons dividerText="Or Continue with" />

                <p className="text-center text-base text-muted-foreground font-medium pt-8">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-primary font-bold hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};
