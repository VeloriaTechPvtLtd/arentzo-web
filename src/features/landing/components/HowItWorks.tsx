import React from 'react';
import { Search, Calendar, PackageCheck, Repeat, ChevronDown } from 'lucide-react';

const steps = [
    {
        title: 'Browse & Select',
        description: 'Explore our catalog and find exactly what you need for rent.',
        icon: Search,
        number: 1
    },
    {
        title: 'Choose Date',
        description: 'Pick your preferred rental dates and check availability.',
        icon: Calendar,
        number: 2
    },
    {
        title: 'Get Delivery',
        description: 'Get your items delivered right to your doorstep or pickup.',
        icon: PackageCheck,
        number: 3
    },
    {
        title: 'Enjoy & Return',
        description: 'Use the product as long as you need and return it easily.',
        icon: Repeat,
        number: 4
    }
];

export const HowItWorks: React.FC = () => {
    return (
        <section className="py-24 bg-[#fff9f5] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-24">
                    <h2 className="text-4xl font-bold text-[#3d3436]">How It Works</h2>
                    <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                        We've simplified the rental process into four seamless steps.
                    </p>
                </div>

                <div className="relative">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-0">
                        {steps.map((step, idx) => (
                            <div key={idx} className="relative group">
                                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                                    {/* Icon Container */}
                                    <div className="relative">
                                        <div className="w-20 h-20 bg-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] rounded-[2rem] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 border border-gray-100 group-hover:border-[#ff7e5f]/30 group-hover:shadow-[#ff7e5f]/10">
                                            <step.icon className="w-8 h-8 text-[#ff7e5f]" />
                                        </div>

                                        {/* Step Number Badge */}
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#3d3436] text-white rounded-xl flex items-center justify-center font-bold text-sm border-2 border-[#fff9f5] group-hover:bg-[#ff7e5f] transition-colors duration-300">
                                            {step.number}
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="space-y-3 px-4">
                                        <h3 className="text-2xl font-bold text-[#3d3436] group-hover:text-[#ff7e5f] transition-all duration-300">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-500 leading-relaxed text-sm font-medium">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Desktop Curved Connector */}
                                {idx < steps.length - 1 && (
                                    <div className="hidden lg:flex absolute top-6 left-[65%] w-[70%] items-center justify-center z-0 pointer-events-none">
                                        <svg
                                            className="w-full h-6"
                                            viewBox="0 0 120 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            {/* Curved dotted path */}
                                            <path
                                                d="M0 12 Q30 2 60 12 Q90 22 120 12"
                                                stroke="url(#gradient)"
                                                strokeWidth="2"
                                                strokeDasharray="6 4"
                                                strokeLinecap="round"
                                                fill="none"
                                            />
                                            {/* Arrow at the end */}
                                            <polygon
                                                points="115,8 120,12 115,16"
                                                fill="#ff7e5f"
                                            />
                                            <defs>
                                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="#ff7e5f" stopOpacity="0.6" />
                                                    <stop offset="100%" stopColor="#feb47b" stopOpacity="0.8" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                )}

                                {/* Mobile/Tablet Connector */}
                                {idx < steps.length - 1 && (
                                    <div className="lg:hidden flex flex-col items-center absolute left-1/2 -translate-x-1/2 -bottom-14 z-0 pointer-events-none">
                                        <div className="flex flex-col items-center gap-1">
                                            <div className="w-0.5 h-2 bg-[#ff7e5f]/40 rounded-full" />
                                            <div className="w-0.5 h-2 bg-[#ff7e5f]/50 rounded-full" />
                                            <div className="w-0.5 h-2 bg-[#ff7e5f]/60 rounded-full" />
                                            <ChevronDown className="w-5 h-5 text-[#ff7e5f] -mt-1" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Subtle background flair */}
            <div className="absolute top-1/2 left-0 w-64 h-64 bg-[#ff7e5f]/5 rounded-full blur-[100px] -translate-x-1/2" />
            <div className="absolute top-1/2 right-0 w-64 h-64 bg-[#feb47b]/5 rounded-full blur-[100px] translate-x-1/2" />
        </section>
    );
};
