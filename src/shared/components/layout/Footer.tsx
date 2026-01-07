import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

export const Footer: React.FC = () => {
    const categories = [
        "Travel & Transport", "Home Essentials", "Garden & Outdoor",
        "Tech & Gadgets", "Events & Parties", "Work & Industry",
        "Fashion & Accessories", "Sports & Leisure", "Care & Wellness",
        "Storage & Space"
    ];

    const usefulLinks = [
        ["Blog", "Privacy", "Terms", "FAQs", "Security", "Contact"],
        ["Partner", "Franchise", "Seller", "Warehouse", "Deliver", "Resources"],
        ["About Us", "Press", "Careers"]
    ];

    return (
        <footer className="bg-[#1a1617] text-white pt-16 pb-8 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-12 mb-16">
                    {/* Useful Links Section */}
                    <div className="lg:w-1/3">
                        <h4 className="text-lg font-bold mb-8 text-white">Useful Links</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3">
                            {usefulLinks.map((column, idx) => (
                                <div key={idx} className="flex flex-col gap-3">
                                    {column.map((link) => {
                                        const routeMap: Record<string, string> = {
                                            "Privacy": "/privacy-policy",
                                            "Terms": "/terms-and-conditions",
                                            "Contact": "/contact-us",
                                            "About Us": "/about-us"
                                        };
                                        const to = routeMap[link] || `/${link.toLowerCase().replace(/\s+/g, '-')}`;
                                        return (
                                            <Link
                                                key={link}
                                                to={to}
                                                className="text-gray-400 hover:text-white transition-colors text-[13px]"
                                            >
                                                {link}
                                            </Link>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Categories Section */}
                    <div className="lg:w-2/3">
                        <div className="flex justify-between items-center mb-8">
                            <h4 className="text-lg font-bold text-white flex items-center gap-4">
                                Categories
                                <Link to="/categories" className="text-gray-400 text-sm font-medium hover:text-white hover:underline">see all</Link>
                            </h4>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3">
                            {categories.map((category) => (
                                <Link
                                    key={category}
                                    to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                                    className="text-gray-400 hover:text-white transition-colors text-[13px]"
                                >
                                    {category}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col items-center gap-10">
                    <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8">
                        {/* Copyright */}
                        <p className="text-gray-500 text-[13px] order-3 md:order-1">
                            © Arentzo Rental Solutions Private Limited, 2024-2026
                        </p>

                        {/* App Downloads */}
                        <div className="flex flex-col sm:flex-row items-center gap-6 order-1 md:order-2">
                            <span className="text-[13px] font-bold text-gray-300">Download App</span>
                            <div className="flex gap-3">
                                <a href="#" className="transition-transform hover:scale-105">
                                    <div className="bg-[#1a1617] text-white px-3 py-1.5 rounded-lg flex items-center gap-2 border border-white/20">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" className="w-5 h-5 invert" alt="Apple" />
                                        <div className="flex flex-col leading-none">
                                            <span className="text-[8px] uppercase tracking-wider">Download on the</span>
                                            <span className="text-[14px] font-semibold">App Store</span>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" className="transition-transform hover:scale-105">
                                    <div className="bg-[#1a1617] text-white px-3 py-1.5 rounded-lg flex items-center gap-2 border border-white/20">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" className="w-5 h-5" alt="Play Store" />
                                        <div className="flex flex-col leading-none">
                                            <span className="text-[8px] uppercase tracking-wider">Get it on</span>
                                            <span className="text-[14px] font-semibold">Google Play</span>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3 order-2 md:order-3">
                            {[
                                { Icon: Facebook, color: "hover:bg-blue-600" },
                                { Icon: Twitter, color: "hover:bg-black" },
                                { Icon: Instagram, color: "hover:bg-pink-600" },
                                { Icon: Linkedin, color: "hover:bg-blue-700" },
                                { Icon: Github, color: "hover:bg-gray-800" }
                            ].map(({ Icon, color }, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className={`w-9 h-9 rounded-full bg-[#1a1617] flex items-center justify-center transition-all ${color} group shadow-sm`}
                                >
                                    <Icon className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};




