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
            <label className="text-sm font-medium text-foreground ml-1">
                {label}
            </label>
            <div className="relative group/input">
                <input
                    type={inputType}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={`
                        w-full px-4 py-3.5 bg-card/50 border rounded-lg outline-none transition-all duration-300 text-sm font-medium placeholder:text-muted-foreground/40
                        ${error
                            ? 'border-destructive/50 bg-destructive/5 focus:border-destructive'
                            : success
                                ? 'border-green-500/50 bg-green-500/5 focus:border-green-500'
                                : isFocused
                                    ? 'border-primary shadow-[0_4px_20px_-4px_oklch(var(--primary)/0.1)] bg-background'
                                    : 'border-input hover:border-sidebar-primary/50 hover:bg-card'}
                        ${className}
                    `}
                    {...props}
                />

                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2 pointer-events-none">
                    {isPassword && (
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent input focus loss if needed
                                setShowPassword(!showPassword);
                            }}
                            className="p-1.5 text-muted-foreground/70 hover:text-foreground transition-colors rounded-md hover:bg-muted pointer-events-auto"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    )}

                    {error && (
                        <AlertCircle className="w-4 h-4 text-destructive animate-in zoom-in duration-300" />
                    )}

                    {success && !error && (
                        <CheckCircle2 className="w-4 h-4 text-green-500 animate-in zoom-in duration-300" />
                    )}
                </div>
            </div>
            {error && (
                <p className="text-[13px] font-medium text-destructive ml-1 mt-1.5 animate-in slide-in-from-top-1 duration-300 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-destructive inline-block" />
                    {error}
                </p>
            )}
        </div>
    );
};
