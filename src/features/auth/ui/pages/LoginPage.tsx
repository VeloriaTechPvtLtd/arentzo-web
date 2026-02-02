import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { AuthInput } from '../components/AuthInput';
import { AuthSocialButtons } from '../components/AuthSocialButtons';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    return (
        <AuthLayout
            title="Welcome back"
            subtitle="Please enter your details to access your Arentzo account"
            imageSrc="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000" // Premium residential image
        >
            <div className="space-y-6">
                <div className="space-y-4">
                    <AuthInput
                        label="Email Address"
                        placeholder="name@company.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />

                    <div className="space-y-2">
                        <AuthInput
                            label="Password"
                            placeholder="••••••••"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />

                        <div className="flex items-center justify-between px-1">
                            <label className="flex items-center space-x-2 cursor-pointer group">
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        className="peer sr-only"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                    />
                                    <div className="w-5 h-5 border-2 border-border rounded-md transition-all peer-checked:bg-primary peer-checked:border-primary group-hover:border-primary/50" />
                                    <svg className="absolute inset-0 w-5 h-5 text-white scale-0 transition-transform peer-checked:scale-100 p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <span className="text-sm font-bold text-foreground/60 group-hover:text-foreground transition-colors">Remember me</span>
                            </label>

                            <Link to="/forgot-password" title="Coming soon!" className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                    </div>
                </div>

                <button
                    className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] mt-2"
                >
                    Log in
                </button>

                <AuthSocialButtons dividerText="Or continue with" />

                <p className="text-center text-sm font-medium text-muted-foreground pt-4">
                    New to Arentzo?{' '}
                    <Link to="/signup" className="text-primary font-bold hover:underline underline-offset-4">
                        Create an account
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};
