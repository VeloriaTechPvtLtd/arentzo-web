import React from 'react';
import { Link } from 'react-router-dom';

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
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background font-sans">
            {/* Left side: Content */}
            <div className="flex flex-col items-center justify-center p-6 sm:p-12 md:p-16 lg:p-24 overflow-y-auto">
                <div className="w-full max-w-sm space-y-8 animate-in fade-in slide-in-from-bottom duration-700">
                    <div className="space-y-4">
                        {showLogo && (
                            <Link to="/" className="text-4xl font-black text-primary tracking-tighter mb-8 inline-block hover:scale-105 transition-transform">
                                Arentzo
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
                    alt="Auth illustration"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-16 left-16 right-16 z-20 space-y-4 text-white">
                    <div className="backdrop-blur-xl bg-white/10 p-8 rounded-[2rem] border border-white/20 shadow-2xl">
                        <div className="text-3xl font-bold leading-tight drop-shadow-sm">
                            Experience the future of <span className="text-accent">premium rentals</span> with Arentzo.
                        </div>
                        <p className="text-white/80 text-lg mt-4 font-medium">
                            Join thousands of users who have found their perfect temporary space.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
