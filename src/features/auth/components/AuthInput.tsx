import React, { useState } from 'react';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    success?: boolean;
    showPasswordToggle?: boolean;
}

export const AuthInput: React.FC<AuthInputProps> = ({
    label,
    error,
    success,
    showPasswordToggle,
    type,
    className = "",
    ...props
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
        <div className="space-y-3 w-full">
            <label className="text-base font-bold text-[#2d2d2d] ml-1">
                {label}
            </label>
            <div className="relative">
                <input
                    type={inputType}
                    className={`
                        w-full px-5 py-4 bg-[#fcfcfc] border rounded-2xl outline-none transition-all text-lg placeholder:text-muted-foreground/40
                        ${error ? 'border-red-500 focus:ring-red-500/10' : success ? 'border-green-500 focus:ring-green-500/10' : 'border-[#f2f2f2] focus:ring-primary/10 focus:border-primary'}
                        ${isPassword || error ? 'pr-12' : ''}
                        ${className}
                    `}
                    {...props}
                />

                {isPassword && showPasswordToggle !== false && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                    </button>
                )}

                {error && !isPassword && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500">
                        <AlertCircle className="w-6 h-6" />
                    </div>
                )}
            </div>
            {error && (
                <p className="text-sm font-medium text-red-500 ml-1 mt-1">
                    {error}
                </p>
            )}
        </div>
    );
};
