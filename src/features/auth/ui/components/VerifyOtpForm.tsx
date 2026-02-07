import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/useAuth';
import { MessageSquareMore, Timer } from 'lucide-react';

interface VerifyOtpFormProps {
    email: string;
    onSuccess: () => void;
}

export const VerifyOtpForm: React.FC<VerifyOtpFormProps> = ({ email, onSuccess }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(30);
    const [error, setError] = useState('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const { verifyOtp, loading } = useAuth();

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft]);

    const handleChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Auto-paste handler
    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = [...otp];
        pastedData.split('').forEach((char, index) => {
            if (index < 6) newOtp[index] = char;
        });
        setOtp(newOtp);
        inputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    };


    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        const fullOtp = otp.join('');
        if (fullOtp.length < 6) return;

        try {
            await verifyOtp(email, fullOtp);
            onSuccess();
        } catch (err: any) {
            setError(err.message || 'The OTP you entered is incorrect. Please try again.');
        }
    };

    return (
        <div className="space-y-6 pt-4">
            <div className="text-center space-y-2 mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-in zoom-in duration-300">
                    <MessageSquareMore className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground text-sm">
                    We sent a verification code to <br />
                    <span className="text-foreground font-semibold">{email}</span>
                </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-8">
                <div className="space-y-4">
                    <div className="flex justify-between gap-2" onPaste={handlePaste}>
                        {otp.map((digit, index) => (
                            <div key={index} className="relative group">
                                <input
                                    ref={(el: HTMLInputElement | null) => {
                                        if (inputRefs.current) {
                                            inputRefs.current[index] = el;
                                        }
                                    }}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className="w-12 h-14 text-center text-2xl font-bold rounded-lg border-2 border-border bg-input/50 focus:border-primary focus:ring-4 focus:ring-primary/10 focus:bg-background transition-all outline-none group-hover:border-primary/50"
                                />
                                {digit && (
                                    <div className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none animate-in fade-in zoom-in duration-200" />
                                )}
                            </div>
                        ))}
                    </div>

                    {error && (
                        <p className="text-[13px] font-medium text-destructive ml-1 mt-1.5 animate-in slide-in-from-top-1 duration-300 flex items-center gap-1.5 justify-center">
                            <span className="w-1 h-1 rounded-full bg-destructive inline-block" />
                            {error}
                        </p>
                    )}

                    {timeLeft > 0 && (
                        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground animate-in fade-in duration-300">
                            <Timer className="w-4 h-4" />
                            <span>Valid for {timeLeft} seconds</span>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Verifying...' : 'Verify details'}
                    </button>

                    {timeLeft === 0 && (
                        <div className="text-center pt-2 animate-in fade-in zoom-in duration-300">
                            <p className="text-sm text-muted-foreground">
                                Didn't receive the code?{' '}
                                <button
                                    type="button"
                                    onClick={() => setTimeLeft(30)}
                                    className="text-primary hover:text-primary/80 font-bold transition-colors cursor-pointer"
                                >
                                    Resend Code
                                </button>
                            </p>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
};
