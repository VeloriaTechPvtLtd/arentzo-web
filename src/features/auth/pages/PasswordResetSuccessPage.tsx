import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { AuthLayout } from '../layouts/AuthLayout';

export const PasswordResetSuccessPage: React.FC = () => {
    const navigate = useNavigate();

    const SuccessIcon = () => (
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center relative">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <Check className="w-10 h-10 text-white stroke-[4px]" />
            </div>
            {/* Pulsing effect */}
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
        </div>
    );

    return (
        <AuthLayout
            showLogo={false}
            headerIcon={<SuccessIcon />}
            title="Password Reset Successfully"
            subtitle="You can now log in using your new password"
        >
            <div className="mt-12">
                <button
                    onClick={() => navigate('/login')}
                    className="w-full bg-primary text-primary-foreground py-5 rounded-3xl font-bold text-xl hover:bg-primary/90 transition-all flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]"
                >
                    Go to Login
                </button>
            </div>
        </AuthLayout>
    );
};
