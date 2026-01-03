import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string | React.ReactNode;
    subtitle: string;
    showLogo?: boolean;
    headerIcon?: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
    children,
    title,
    subtitle,
    showLogo = true,
    headerIcon
}) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground font-sans p-6 sm:p-12">
            <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
                <div className="text-center space-y-4">
                    {showLogo && (
                        <Link to="/" className="text-4xl font-black text-primary tracking-tighter mb-4 inline-block hover:scale-105 transition-transform">
                            Arentzo
                        </Link>
                    )}

                    {headerIcon && (
                        <div className="flex justify-center mb-6">
                            {headerIcon}
                        </div>
                    )}

                    <h1 className="text-3xl font-black tracking-tight text-[#2d2d2d] leading-tight px-4">
                        {title}
                    </h1>
                    <p className="text-muted-foreground text-lg leading-snug max-w-[320px] mx-auto">
                        {subtitle}
                    </p>
                </div>

                <div className="mt-8">
                    {children}
                </div>
            </div>
        </div>
    );
};
