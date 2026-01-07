import React, { useState } from 'react';
import { AuthInput } from './AuthInput';
import { AuthSocialButtons } from './AuthSocialButtons';
import { ProfileUpload } from './ProfileUpload';
import { useAuth } from '../context/AuthContext';

interface SignupFormProps {
    onSwitchToLogin: () => void;
    onSuccess?: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin, onSuccess }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const { signIn } = useAuth();

    const [emailError, setEmailError] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setEmail(val);
        if (val.length > 0 && !val.includes('@')) {
            setEmailError('Invalid email format');
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
        if (!agreedToTerms) return;
        console.log({ fullName, email, password });
        signIn();
        if (onSuccess) onSuccess();
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
            <div className="flex justify-center -mt-2">
                <ProfileUpload onImageSelect={(file) => console.log(file)} />
            </div>

            <div className="space-y-6">
                <AuthInput
                    label="Full Name"
                    placeholder="Enter your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />

                <AuthInput
                    label="Email"
                    placeholder="Enter your email address"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    error={emailError}
                    success={isEmailValid}
                    required
                />

                <AuthInput
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    showPasswordToggle={true}
                    required
                />

                <AuthInput
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    showPasswordToggle={true}
                    required
                />

                <div className="flex items-start space-x-3 py-1">
                    <input
                        id="terms-drawer"
                        type="checkbox"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="w-5 h-5 mt-0.5 rounded border-[#f2f2f2] text-primary focus:ring-primary accent-primary cursor-pointer"
                        required
                    />
                    <label htmlFor="terms-drawer" className="text-sm font-medium text-[#2d2d2d] cursor-pointer leading-tight">
                        I agree to the <span className="text-primary hover:underline">Terms & Conditions</span> and <span className="text-primary hover:underline">Privacy Policy</span>
                    </label>
                </div>
            </div>

            <button
                type="submit"
                disabled={!agreedToTerms}
                className="w-full bg-primary text-white py-4 rounded-3xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Create account
            </button>

            <AuthSocialButtons dividerText="Or Continue with" />

            <p className="text-center text-base text-muted-foreground font-medium pt-6 pb-4">
                Already have an account?{' '}
                <button
                    type="button"
                    onClick={onSwitchToLogin}
                    className="text-primary font-bold hover:underline bg-transparent border-none cursor-pointer"
                >
                    Log in
                </button>
            </p>
        </form>
    );
};
