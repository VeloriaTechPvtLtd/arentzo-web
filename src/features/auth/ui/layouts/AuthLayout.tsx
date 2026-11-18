'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string | React.ReactNode;
    subtitle: string;
    showLogo?: boolean;
    headerIcon?: React.ReactNode;
    imageSrc?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
    children,
    title,
    subtitle,
    showLogo = true,
    headerIcon,
    imageSrc = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000" // Fallback premium image
}) => {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background font-sans">
            {/* Left side: Content */}
            <div className="flex flex-col items-center justify-center p-6 sm:p-12 md:p-16 lg:p-24 overflow-y-auto">
                <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
                    <div className="space-y-4">
                        {showLogo && (
                            <Link href="/" className="flex items-center gap-3 mb-8 hover:scale-105 transition-transform inline-flex">
                                <img src="/logo.svg" alt="Arentzo" className="w-12 h-12" />
                                <span className="text-4xl font-black text-primary tracking-tighter">Arentzo</span>
                            </Link>
                        )}

                        {headerIcon && (
                            <div className="flex justify-start mb-6">
                                {headerIcon}
                            </div>
                        )}

                        <div className="space-y-3">
                            <h1 className="text-4xl font-black tracking-tight text-foreground leading-[1.1]">
                                {title}
                            </h1>
                            <p className="text-muted-foreground text-lg leading-relaxed max-w-[340px]">
                                {subtitle}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        {children}
                    </div>
                </div>
            </div>

            {/* Right side: Illustration (Desktop only) */}
            <div className="hidden lg:block relative h-full">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10" />
                <img
                    src={imageSrc}
                    alt={t('auth.layout.illustrationAlt')}
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-16 left-16 right-16 z-20 space-y-4 text-white">
                    <div className="backdrop-blur-xl bg-white/10 p-8 rounded-[2rem] border border-white/20 shadow-2xl">
                        <div className="text-3xl font-bold leading-tight drop-shadow-sm">
                            {t('auth.layout.heroTitle')}
                        </div>
                        <p className="text-white/80 text-lg mt-4 font-medium">
                            {t('auth.layout.heroSubtitle')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
