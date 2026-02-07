import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { AuthInput } from '../components/AuthInput';

interface SignupFormProps {
    onSuccess: (email: string) => void;
    onLoginClick: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSuccess, onLoginClick }) => {
    const { signUp, loading } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = async () => {
        setError('');
        if (!name || !email || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await signUp(email, name);
            onSuccess(email);
        } catch (err) {
            console.error(err);
            setError('Failed to create account');
        }
    };

    return (
        <div className="space-y-6 pt-4">
            <div className="space-y-4">
                <AuthInput
                    label="Full Name"
                    placeholder="John Doe"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <AuthInput
                    label="Email Address"
                    placeholder="name@company.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <AuthInput
                    label="Password"
                    placeholder="••••••••"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <AuthInput
                    label="Confirm Password"
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
                {loading ? 'Creating Account...' : 'Sign Up'}
            </button>

            <p className="text-center text-sm text-muted-foreground font-medium">
                Already have an account?{' '}
                <button
                    onClick={onLoginClick}
                    className="text-primary hover:text-primary/80 font-bold transition-colors"
                >
                    Log in
                </button>
            </p>
        </div>
    );
};
