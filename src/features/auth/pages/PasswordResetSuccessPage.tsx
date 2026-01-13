import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ShieldCheck } from 'lucide-react';
import { AuthLayout } from '../layouts/AuthLayout';

const HeaderIcon = () => (
    <div className="relative">
        <div className="w-20 h-20 bg-green-500/10 rounded-[2rem] flex items-center justify-center">
            <Check className="w-10 h-10 text-green-500 stroke-[3px]" />
        </div>
        <div className="absolute -top-2 -right-2 bg-background p-1.5 rounded-full shadow-lg border border-border">
            <ShieldCheck className="w-5 h-5 text-green-500" />
        </div>
    </div>
);

export const PasswordResetSuccessPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <AuthLayout
            showLogo={true}
            headerIcon={<HeaderIcon />}
            title="All set!"
            subtitle="Your password has been reset successfully. You can now access your account with your new credentials."
            imageSrc="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=2000" // Premium cozy home
        >
            <div className="mt-8 space-y-6">
                <button
                    onClick={() => navigate('/login')}
                    className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                >
                    Back to log in
                </button>

                <p className="text-center text-xs font-medium text-muted-foreground px-4">
                    If you didn't perform this action, please contact our support team immediately.
                </p>
            </div>
        </AuthLayout>
    );
};
