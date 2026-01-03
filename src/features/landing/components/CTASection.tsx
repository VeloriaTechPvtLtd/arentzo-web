import React from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export const CTASection: React.FC = () => {
    return (
        <section className="pt-6 pb-24 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
                {/* Main Card - More compact and integrated */}
                <div className="relative bg-[#3d3436] rounded-[3rem] p-8 md:p-16 overflow-hidden shadow-2xl shadow-[#3d3436]/20">
                    {/* Background Accents */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff7e5f]/20 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#feb47b]/10 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none" />

                    <div className="relative z-10 grid lg:grid-cols-5 gap-12 items-center">
                        {/* Left Side: Content (3/5 cols) */}
                        <div className="lg:col-span-3 space-y-8">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-bold border border-white/10">
                                <ShieldCheck className="w-4 h-4 text-[#ff7e5f]" />
                                Arentzo Protection Guarantee
                            </div>

                            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                                Your peace of mind is <br />
                                <span className="text-[#ff7e5f]">our only priority.</span>
                            </h2>

                            <p className="text-lg text-gray-300 leading-relaxed max-w-xl">
                                Join 50,000+ people who trust Arentzo. Every transaction is covered, every user is verified, every time.
                            </p>

                            <div className="flex flex-wrap gap-6">
                                <button className="group px-8 py-4 bg-[#ff7e5f] text-white font-bold rounded-2xl shadow-xl shadow-[#ff7e5f]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 text-lg">
                                    Get Started
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all text-lg">
                                    How it works
                                </button>
                            </div>
                        </div>

                        {/* Right Side: Metrics (2/5 cols) */}
                        <div className="lg:col-span-2 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 space-y-8 border border-white/10">
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 group">
                                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">100% Insured</p>
                                        <p className="text-sm text-gray-400">Up to $50k damage coverage</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group text-white">
                                    <div className="w-10 h-10 bg-[#ff7e5f]/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <ShieldCheck className="w-6 h-6 text-[#ff7e5f]" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">AI Verified</p>
                                        <p className="text-sm text-gray-400">Biometric identity vetting</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group text-white">
                                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <CheckCircle2 className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">24/7 Support</p>
                                        <p className="text-sm text-gray-400">Live human help anytime</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map(i => (
                                            <img key={i} src={`https://i.pravatar.cc/100?u=${i + 40}`} className="w-10 h-10 rounded-full border-4 border-[#3d3436]" alt="user" />
                                        ))}
                                    </div>
                                    <p className="text-sm text-gray-300 font-medium">
                                        <span className="text-white font-bold">50k+</span> members trusted
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
