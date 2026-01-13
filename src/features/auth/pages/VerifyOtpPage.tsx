import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { Timer, ArrowLeft, MessageSquareMore } from 'lucide-react';

const HeaderIcon = () => (
    <div className="relative">
        <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center animate-pulse">
            <MessageSquareMore className="w-10 h-10 text-primary" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-background p-1.5 rounded-full shadow-lg border border-border">
            <Timer className="w-5 h-5 text-primary" />
        </div>
    </div>
);

export const VerifyOtpPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || 'user@example.com';

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [error, setError] = useState('');
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);
        setError('');

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        const fullOtp = otp.join('');
        if (fullOtp.length < 6) return;

        if (fullOtp === '123456') {
            navigate('/reset-password', { state: { email } });
        } else {
            setError('The OTP you entered is incorrect. Please try again.');
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <AuthLayout
            showLogo={true}
            headerIcon={<HeaderIcon />}
            title="Verify Email"
            subtitle={`We've sent a 6-digit code to ${email}`}
            imageSrc="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" // Premium glass building
        >
            <form onSubmit={handleVerify} className="space-y-10 mt-6">
                <div className="space-y-6">
                    <div className="flex justify-between gap-2 px-1">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputRefs.current[index] = el;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black bg-card border-[1.5px] rounded-xl outline-none transition-all duration-300
                                    ${error
                                        ? 'border-destructive text-destructive bg-destructive/5'
                                        : 'border-border focus:border-primary focus:shadow-[0_0_0_4px_oklch(var(--primary)/0.1)]'}
                                `}
                            />
                        ))}
                    </div>

                    {error && (
                        <p className="text-destructive text-sm font-bold text-center animate-in slide-in-from-top-1 duration-300">
                            {error}
                        </p>
                    )}

                    <div className="text-center">
                        <p className="items-center text-sm font-medium text-muted-foreground">
                            Didn't receive code?{' '}
                            <button
                                type="button"
                                onClick={() => timer === 0 && setTimer(30)}
                                className={`font-black transition-colors ${timer === 0 ? 'text-primary hover:underline' : 'text-primary/40 cursor-not-allowed'}`}
                            >
                                Resend
                            </button>
                            {timer > 0 && <span className="ml-2 py-1 px-2 bg-muted rounded-full text-[10px] font-black uppercase text-foreground/70">in {formatTime(timer)}</span>}
                        </p>
                    </div>
                </div>

                <div className="space-y-6">
                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-lg hover:bg-primary/90 transition-all flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Verify details
                    </button>

                    <div className="text-center pt-2">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors group"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                            Use different email
                        </button>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
};
