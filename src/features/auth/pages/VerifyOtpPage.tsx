import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';

// ClockIcon component defined outside
const ClockIcon = () => (
    <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center relative">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
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

        // Simulate verification
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
            showLogo={false}
            headerIcon={<ClockIcon />}
            title={<span className="break-all">{email}</span>}
            subtitle="We've sent a 6 - digit code to your email"
        >
            <form onSubmit={handleVerify} className="space-y-10">
                <div className="space-y-4">
                    <div className="flex justify-between gap-2 sm:gap-4 px-2">
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
                                className={`w-12 h-14 sm:w-16 sm:h-20 text-center text-2xl font-bold bg-[#fcfcfc] border-2 rounded-2xl outline-none transition-all
                                    ${error ? 'border-red-500 text-red-500' : 'border-[#f2f2f2] focus:border-primary focus:ring-2 focus:ring-primary/10'}
                                `}
                            />
                        ))}
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm font-medium text-center animate-shake">
                            {error}
                        </p>
                    )}

                    <div className="text-center text-muted-foreground font-medium">
                        Didn't receive OTP?{' '}
                        <button
                            type="button"
                            onClick={() => timer === 0 && setTimer(30)}
                            className={`font-bold transition-colors ${timer === 0 ? 'text-primary hover:underline' : 'text-primary/50 cursor-not-allowed'}`}
                        >
                            Resend OTP
                        </button>
                        <span className="ml-2 text-[#2d2d2d] font-bold">in {formatTime(timer)}</span>
                    </div>
                </div>

                <div className="space-y-6">
                    <button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground py-5 rounded-3xl font-bold text-xl hover:bg-primary/90 transition-all flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-[0.99]"
                    >
                        Verify OTP
                    </button>

                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="text-primary font-bold text-lg hover:underline transition-all"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </form>
        </AuthLayout>
    );
};
