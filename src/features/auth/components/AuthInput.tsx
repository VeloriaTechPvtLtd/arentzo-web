import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    success?: boolean;
}

export const AuthInput: React.FC<AuthInputProps> = ({
    label,
    error,
    success,
    type,
    className = "",
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="space-y-2 w-full group">
            <label className={`text-sm font-bold transition-colors duration-200 ml-1 ${isFocused ? 'text-primary' : 'text-foreground/70'}`}>
                {label}
            </label>
            <div className="relative group/input">
                <input
                    type={inputType}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`
                        w-full px-5 py-4 bg-card border-[1.5px] rounded-2xl outline-none transition-all duration-300 text-base font-medium placeholder:text-muted-foreground/30
                        ${error
                            ? 'border-destructive bg-destructive/5'
                            : success
                                ? 'border-green-500 bg-green-50/30'
                                : isFocused
                                    ? 'border-primary shadow-[0_0_0_4px_oklch(var(--primary)/0.1)]'
                                    : 'border-border hover:border-border-strong hover:bg-muted/30'}
                        ${className}
                    `}
                    {...props}
                />

                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-2 text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    )}

                    {error && (
                        <AlertCircle className="w-5 h-5 text-destructive animate-in zoom-in duration-300" />
                    )}

                    {success && !error && (
                        <CheckCircle2 className="w-5 h-5 text-green-500 animate-in zoom-in duration-300" />
                    )}
                </div>
            </div>
            {error && (
                <p className="text-xs font-bold text-destructive ml-1 mt-1 animate-in slide-in-from-top-1 duration-300">
                    {error}
                </p>
            )}
        </div>
    );
};
