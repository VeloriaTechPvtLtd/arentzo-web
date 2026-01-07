import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User as UserIcon, LogOut, Box } from 'lucide-react';
import { useAuth } from '../../../features/auth/context/AuthContext';
import { useDrawer } from '../../context/DrawerContext';

export const Navbar: React.FC = () => {
    const { user, signOut } = useAuth();
    const { openProfile } = useDrawer();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-4' : 'bg-transparent py-6'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-[#ff7e5f] rounded-xl flex items-center justify-center shadow-lg shadow-[#ff7e5f]/20 group-hover:scale-110 transition-transform">
                            <Box className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-[#3d3436] tracking-tight">Arentzo</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="flex max-md:hidden items-center space-x-10">
                        <Link to="/browse" className="text-[#3d3436] font-bold text-[#ff7e5f] hover:underline transition-colors">Browse Marketplace</Link>
                        <Link to="/" className="text-[#3d3436] font-medium hover:text-[#ff7e5f] transition-colors">Programs</Link>
                        <Link to="/#how-it-works" className="text-[#3d3436] font-medium hover:text-[#ff7e5f] transition-colors">How It Works</Link>
                        <Link to="/contact-us" className="text-[#3d3436] font-medium hover:text-[#ff7e5f] transition-colors">Support</Link>
                    </div>

                    {/* Auth Actions */}
                    <div className="flex max-md:hidden items-center space-x-6">
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-3 px-4 py-2 bg-[#ffedea] rounded-xl border border-[#ff7e5f]/20">
                                    <UserIcon className="w-4 h-4 text-[#ff7e5f]" />
                                    <span className="text-sm font-bold text-[#b35340]">{user.email?.split('@')[0]}</span>
                                </div>
                                <button
                                    onClick={() => signOut()}
                                    className="p-2 text-gray-400 hover:text-[#ff7e5f] transition-colors"
                                    title="Sign Out"
                                >
                                    <LogOut className="w-5 h-5" />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={openProfile}
                                className="bg-[#ff7e5f] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-[#ff7e5f]/20 hover:scale-105 active:scale-95 transition-all"
                            >
                                Login / Signup
                            </button>
                        )}
                    </div>

                    {/* Mobile Actions */}
                    <div className="md:hidden flex items-center gap-3">
                        {!user && (
                            <button
                                onClick={openProfile}
                                className="text-sm font-bold text-[#ff7e5f] px-3 py-1.5 bg-[#ffedea] rounded-lg"
                            >
                                Login / Signup
                            </button>
                        )}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-[#3d3436] bg-white rounded-xl shadow-sm border border-gray-100"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-xl p-6 space-y-6 animate-in slide-in-from-top duration-300">
                    <div className="flex flex-col space-y-4">
                        <Link to="/" className="text-lg font-medium text-[#3d3436]" onClick={() => setIsMenuOpen(false)}>Programs</Link>
                        <Link to="/#how-it-works" className="text-lg font-medium text-[#3d3436]" onClick={() => setIsMenuOpen(false)}>How It Works</Link>
                        <Link to="/contact-us" className="text-lg font-medium text-[#3d3436]" onClick={() => setIsMenuOpen(false)}>Support</Link>
                    </div>

                    <div className="pt-6 border-t border-gray-100">
                        {user ? (
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-2xl">
                                    <UserIcon className="w-5 h-5 text-[#ff7e5f]" />
                                    <span className="font-bold text-[#3d3436]">{user.email}</span>
                                </div>
                                <button
                                    onClick={() => { signOut(); setIsMenuOpen(false); }}
                                    className="w-full bg-[#ffedea] text-[#b35340] py-4 rounded-2xl font-bold"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => { openProfile(); setIsMenuOpen(false); }}
                                    className="py-4 text-[#3d3436] font-bold"
                                >
                                    Log In
                                </button>
                                <button
                                    onClick={() => { openProfile(); setIsMenuOpen(false); }}
                                    className="bg-[#ff7e5f] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#ff7e5f]/20"
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

