import React from 'react';
import { Search, Star, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
    return (
        <section className="relative min-h-screen pt-24 pb-16 overflow-hidden bg-[#fffdfb] flex items-center">
            {/* Background Aesthetic Blobs */}
            <div className="absolute top-[5%] right-[-5%] w-[400px] h-[400px] bg-[#ff7e5f]/8 rounded-full blur-[80px] -z-10" />
            <div className="absolute bottom-[5%] left-[-5%] w-[350px] h-[350px] bg-[#feb47b]/8 rounded-full blur-[70px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                    {/* Left Content */}
                    <div className="max-w-xl text-left">
                        {/* Trust Pill - Premium Rental Platform */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full mb-8 shadow-sm">
                            <Sparkles className="w-4 h-4 text-[#ff7e5f]" />
                            <span className="text-sm font-medium text-gray-700">Premium Rental Platform</span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#2d2d2d] leading-[1.05] mb-6 tracking-tight">
                            Rent <br />
                            Anything, <br />
                            <span className="text-[#ff7e5f]">Anytime</span>
                        </h1>

                        {/* Description - Matches design text */}
                        <p className="text-base lg:text-lg text-gray-500 mb-8 leading-relaxed max-w-[420px]">
                            Your premium platform for all rental needs. From luxury furniture to vehicles, construction equipment to event supplies — experience hassle-free rentals.
                        </p>

                        {/* Search Bar */}
                        <div className="flex items-center gap-3 mb-10 max-w-[420px]">
                            <div className="flex-1 flex items-center gap-3 px-4 bg-white rounded-lg shadow-[0_10px_40px_-10px_rgba(0,0,0,0.12)] border border-gray-100 transition-all hover:shadow-xl focus-within:border-[#ff7e5f]/20">
                                <Search className="w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="What do you want to rent?"
                                    className="w-full bg-transparent border-none outline-none text-gray-700 placeholder:text-gray-400 text-base h-12"
                                />
                            </div>
                            <button className="bg-[#ff7e5f] w-12 h-12 rounded-lg text-white shadow-lg shadow-[#ff7e5f]/30 hover:bg-[#ef6c4e] transition-all flex items-center justify-center shrink-0">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Metrics - Updated Labels */}
                        <div className="flex items-center gap-10">
                            <div>
                                <h3 className="text-2xl font-bold text-[#2d2d2d] mb-1">10K+</h3>
                                <p className="text-gray-500 text-sm font-medium">Premium Items</p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-[#2d2d2d] mb-1">50K+</h3>
                                <p className="text-gray-500 text-sm font-medium">Happy Customers</p>
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5 mb-1">
                                    <h3 className="text-2xl font-bold text-[#2d2d2d]">4.9</h3>
                                    <Star className="w-5 h-5 text-[#2d2d2d] fill-[#2d2d2d]" />
                                </div>
                                <p className="text-gray-500 text-sm font-medium">Average Rating</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content: 2-Column Overlapping Image Grid */}
                    <div className="hidden lg:flex gap-3 max-w-[440px] mx-auto">
                        {/* Left Column */}
                        <div className="flex flex-col gap-3 flex-1">
                            {/* Image 1 - Tall (1:1.3 aspect ratio) */}
                            <div
                                className="w-full rounded-lg overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-300"
                                style={{ aspectRatio: '1 / 1.3' }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=600"
                                    className="w-full h-full object-cover"
                                    alt="Modern Living Room"
                                />
                            </div>
                            {/* Image 3 - Short (1:0.8 aspect ratio) */}
                            <div
                                className="w-full rounded-lg overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-300"
                                style={{ aspectRatio: '1 / 0.8' }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=600"
                                    className="w-full h-full object-cover"
                                    alt="Luxury Sports Car"
                                />
                            </div>
                        </div>

                        {/* Right Column - offset down to create overlap effect */}
                        <div className="flex flex-col gap-3 flex-1 mt-12">
                            {/* Image 2 - Short (1:0.8 aspect ratio) */}
                            <div
                                className="w-full rounded-lg overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-300"
                                style={{ aspectRatio: '1 / 0.8' }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=600"
                                    className="w-full h-full object-cover"
                                    alt="Office Setup"
                                />
                            </div>
                            {/* Image 4 - Tall (1:1.3 aspect ratio) */}
                            <div
                                className="w-full rounded-lg overflow-hidden shadow-xl hover:scale-[1.02] transition-transform duration-300"
                                style={{ aspectRatio: '1 / 1.3' }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600"
                                    className="w-full h-full object-cover"
                                    alt="Event Space"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Image Grid - All 4 images */}
                    <div className="flex gap-3 lg:hidden mt-6">
                        {/* Left Column */}
                        <div className="flex flex-col gap-3 flex-1">
                            {/* Image 1 - Tall (1:1.3 aspect ratio) */}
                            <div className="rounded-lg overflow-hidden shadow-lg" style={{ aspectRatio: '1 / 1.3' }}>
                                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Interior" />
                            </div>
                            {/* Image 3 - Short (1:0.8 aspect ratio) */}
                            <div className="rounded-lg overflow-hidden shadow-lg" style={{ aspectRatio: '1 / 0.8' }}>
                                <img src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Car" />
                            </div>
                        </div>
                        {/* Right Column - offset down */}
                        <div className="flex flex-col gap-3 flex-1 mt-10">
                            {/* Image 2 - Short (1:0.8 aspect ratio) */}
                            <div className="rounded-lg overflow-hidden shadow-lg" style={{ aspectRatio: '1 / 0.8' }}>
                                <img src="https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Office" />
                            </div>
                            {/* Image 4 - Tall (1:1.3 aspect ratio) */}
                            <div className="rounded-lg overflow-hidden shadow-lg" style={{ aspectRatio: '1 / 1.3' }}>
                                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Event" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
