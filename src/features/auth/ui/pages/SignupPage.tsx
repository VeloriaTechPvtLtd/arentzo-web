'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuthLayout } from '../layouts/AuthLayout';
import { AuthInput } from '../components/AuthInput';
import { AuthSocialButtons } from '../components/AuthSocialButtons';
import { ProfileUpload } from '../components/ProfileUpload';

export const SignupPage: React.FC = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const [emailError, setEmailError] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setEmail(val);

        if (val.length > 0 && !val.includes('@')) {
            setEmailError('Please enter a valid email address');
            setIsEmailValid(false);
        } else if (val.includes('@')) {
            setEmailError('');
            setIsEmailValid(true);
        } else {
            setEmailError('');
            setIsEmailValid(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ fullName, email, password, agreedToTerms });
    };

    return (
        <AuthLayout
            title="Create account"
            subtitle="Join Arentzo today and explore premium rentals curated just for you"
            imageSrc="https://images.unsplash.com/photo-1460317442991-0ec23939714b?auto=format&fit=crop&q=80&w=2000" // Premium modern apartment image
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <ProfileUpload onImageSelect={(file) => console.log(file)} />

                <div className="space-y-4">
                    <AuthInput
                        label="Full Name"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />

                    <AuthInput
                        label="Email Address"
                        placeholder="john@example.com"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        error={emailError}
                        success={isEmailValid}
                        required
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <AuthInput
                            label="Password"
                            placeholder="••••••••"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <AuthInput
                            label="Confirm Password"
                            placeholder="••••••••"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex items-start space-x-3 py-2 px-1">
                        <div className="relative flex items-center h-5">
                            <input
                                id="terms"
                                type="checkbox"
                                checked={agreedToTerms}
                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                className="peer sr-only"
                                required
                            />
                            <div className="w-5 h-5 border-2 border-border rounded-md transition-all peer-checked:bg-primary peer-checked:border-primary group-hover:border-primary/50" />
                            <svg className="absolute inset-0 w-5 h-5 text-white scale-0 transition-transform peer-checked:scale-100 p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <label htmlFor="terms" className="text-sm font-medium text-foreground/70 leading-tight cursor-pointer">
                            I agree to the <Link href="/terms" className="text-primary font-bold hover:underline underline-offset-4">Terms</Link> and <Link href="/privacy" className="text-primary font-bold hover:underline underline-offset-4">Privacy Policy</Link>
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                    Create account
                </button>

                <AuthSocialButtons dividerText="Or sign up with" />

                <p className="text-center text-sm font-medium text-muted-foreground pt-4">
                    Already have an account?{' '}
                    <Link href="/login" className="text-primary font-bold hover:underline underline-offset-4">
                        Log in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};
