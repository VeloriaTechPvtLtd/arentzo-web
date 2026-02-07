import React, { useState, useEffect } from 'react';
import { Drawer } from '../../../../shared/components/ui/drawer/Drawer.tsx';
import { useDrawer } from '../../../../shared/hooks/useDrawer.ts';
import { LoginForm } from './LoginForm';
import { VerifyOtpForm } from './VerifyOtpForm';
import { SignupForm } from './SignupForm';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { ResetPasswordOtpForm } from './ResetPasswordOtpForm';
import { ResetPasswordForm } from './ResetPasswordForm';

export const AuthDrawer: React.FC = () => {
    const { isAuthOpen, closeAuth } = useDrawer();
    const [step, setStep] = useState<'login' | 'signup' | 'forgot-password' | 'forgot-password-otp' | 'reset-password' | 'otp'>('login');
    const [email, setEmail] = useState('');
    const [resetOtp, setResetOtp] = useState('');

    // Reset state when drawer closes
    useEffect(() => {
        if (!isAuthOpen) {
            const timer = setTimeout(() => {
                setStep('login');
                setEmail('');
                setResetOtp('');
            }, 300); // Wait for close animation
            return () => clearTimeout(timer);
        }
    }, [isAuthOpen]);

    const handleLoginSuccess = () => {
        closeAuth();
    };

    const handleSignupSuccess = (userEmail: string) => {
        setEmail(userEmail);
        setStep('otp');
    };

    const handleVerifySuccess = () => {
        closeAuth();
    };

    const getTitle = () => {
        switch (step) {
            case 'login': return 'Welcome Back';
            case 'signup': return 'Create Account';
            case 'forgot-password': return 'Reset Password';
            case 'forgot-password-otp': return 'Verify Code';
            case 'reset-password': return 'New Password';
            case 'otp': return 'Verification Code';
        }
    };

    const handleBack = () => {
        switch (step) {
            case 'signup':
            case 'forgot-password':
                setStep('login');
                break;
            case 'forgot-password-otp':
                setStep('forgot-password');
                break;
            case 'reset-password':
                setStep('forgot-password-otp');
                break;
            case 'otp':
                setStep('login');
                break;
            default:
                break;
        }
    };

    const showBackButton = step !== 'login';

    return (
        <Drawer
            isOpen={isAuthOpen}
            onClose={closeAuth}
            title={getTitle()}
            onBack={showBackButton ? handleBack : undefined}
            showCloseButton={step === 'login'}
            width="400px"
        >
            <div className="h-full flex flex-col">
                <div className="flex-1 overflow-y-auto px-6 pb-6">
                    {step === 'login' && (
                        <LoginForm
                            onSuccess={handleLoginSuccess}
                            onSignupClick={() => setStep('signup')}
                            onForgotPasswordClick={() => setStep('forgot-password')}
                        />
                    )}
                    {step === 'signup' && (
                        <SignupForm
                            onSuccess={handleSignupSuccess}
                            onLoginClick={() => setStep('login')}
                        />
                    )}
                    {step === 'forgot-password' && (
                        <ForgotPasswordForm
                            onSuccess={() => setStep('forgot-password-otp')}
                            onEmailSet={(e) => setEmail(e)}
                            onBack={() => setStep('login')}
                        />
                    )}
                    {step === 'forgot-password-otp' && (
                        <ResetPasswordOtpForm
                            email={email}
                            onSuccess={(otpCode) => {
                                setResetOtp(otpCode);
                                setStep('reset-password');
                            }}
                        />
                    )}
                    {step === 'reset-password' && (
                        <ResetPasswordForm
                            email={email}
                            otp={resetOtp}
                            onSuccess={() => setStep('login')}
                        />
                    )}
                    {step === 'otp' && (
                        <VerifyOtpForm email={email} onSuccess={handleVerifySuccess} />
                    )}
                </div>
            </div>
        </Drawer>
    );
};
