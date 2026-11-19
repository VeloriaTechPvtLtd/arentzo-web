import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { AuthInput } from '../components/AuthInput';
import { CheckCircle2 } from 'lucide-react';

interface ResetPasswordFormProps {
    email: string;
    otp: string;
    onSuccess: () => void;
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ email, otp, onSuccess }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const { resetPassword, loading } = useAuth();

    const handleSubmit = async () => {
        setError('');
        if (!password || !confirmPassword) {
            setError('All fields are required');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        try {
            await resetPassword(email, otp, password);
            setSuccess(true);
            setTimeout(() => {
                onSuccess();
            }, 2000);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Failed to reset password');
        }
    };

    if (success) {
        return (
            <div className="text-center space-y-6 pt-10 px-4 animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-600">
                    <CheckCircle2 size={40} />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Password Reset!</h3>
                <p className="text-muted-foreground">
                    Your password has been successfully updated. You can now log in with your new password.
                </p>
                <div className="pt-4">
                    <div className="w-full bg-muted/50 h-2 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 animate-[progress_2s_ease-in-out_forwards]" style={{ width: '100%' }} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Redirecting to login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pt-4">
            <p className="text-muted-foreground text-sm mb-6">
                Create a strong password for your account.
            </p>

            <div className="space-y-4">
                <AuthInput
                    label="New Password"
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
                    error={error}
                />
            </div>

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? 'Resetting...' : 'Reset Password'}
            </button>
        </div>
    );
};
