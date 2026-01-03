import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

    // For demonstration of error/success states as seen in screenshots
    const [emailError, setEmailError] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setEmail(val);

        // Simple logic to mimic the screenshots
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
        // Handle registration logic here
        console.log({ fullName, email, password, agreedToTerms });
    };

    return (
        <AuthLayout
            title="Create an account"
            subtitle="Sign up to get started"
            showLogo={false}
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <ProfileUpload onImageSelect={(file) => console.log(file)} />

                <div className="space-y-5">
                    <AuthInput
                        label="Full Name"
                        placeholder="Enter your name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />

                    <AuthInput
                        label="Email"
                        placeholder="Enter your email address"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        error={emailError}
                        success={isEmailValid}
                    />

                    <AuthInput
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        showPasswordToggle={true}
                    />

                    <AuthInput
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        showPasswordToggle={true}
                    />

                    <div className="flex items-center space-x-3 py-1">
                        <input
                            id="terms"
                            type="checkbox"
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                            className="w-5 h-5 rounded border-[#f2f2f2] text-primary focus:ring-primary accent-primary cursor-pointer"
                        />
                        <label htmlFor="terms" className="text-sm font-medium text-[#2d2d2d] cursor-pointer">
                            I agree to the <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-5 rounded-3xl font-bold text-xl hover:bg-primary/90 transition-all flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]"
                >
                    Create account
                </button>

                <AuthSocialButtons dividerText="Or Continue with" />

                <p className="text-center text-base text-muted-foreground font-medium pt-4">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary font-bold hover:underline">
                        Log in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
};
