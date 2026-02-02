import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import {
    User,
    Search,
    MessageSquare,
    Box
} from 'lucide-react';
import { useAuth } from '../../../features/auth/ui/context/AuthContext';
import { useDrawer } from '../../hooks/useDrawer';
import './AppHeader.css';

export const AppHeader: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, activeRole } = useAuth();
    const {
        openProfile,
        openMessages,
    } = useDrawer();

    const isAuthPage = ['/login', '/signup', '/forgot-password', '/verify-otp', '/reset-password'].includes(location.pathname);
    const isHomePage = location.pathname === '/' || location.pathname === '/home';

    if (isAuthPage) return null;

    const getPageTitle = () => {
        if (isHomePage) return 'Arentzo';
        if (activeRole === 'service_provider') return 'Provider Console';
        if (location.pathname.startsWith('/search')) return 'Search';
        if (location.pathname.startsWith('/browse')) return 'Marketplace';
        if (location.pathname.startsWith('/favorites')) return 'Favorites';
        if (location.pathname.startsWith('/my-rentals')) return 'My Rentals';
        return 'Arentzo';
    };

    return (
        <header className={`app-header ${activeRole ? `app-header--${activeRole.replace('_', '-')}` : ''}`}>
            <div className="app-header__container">
                {/* Left Section: Contextual Title */}
                <div className="app-header__left">
                    <Link to={activeRole === 'service_provider' ? '/provider-dashboard' : '/'} className="app-header__logo">
                        <div className="app-header__logo-icon">
                            <Box size={24} />
                        </div>
                        <span className="app-header__logo-text">{getPageTitle()}</span>
                    </Link>
                </div>

                {/* Middle Section: Role-based Navigation or Search */}
                <div className="app-header__center">
                    {user ? (
                        activeRole === 'service_provider' ? (
                            <nav className="app-header__nav">
                                <Link to="/provider-dashboard" className="app-header__nav-link">Dashboard</Link>
                                <Link to="/provider-dashboard/products" className="app-header__nav-link">Products</Link>
                                <Link to="/provider-dashboard/offers" className="app-header__nav-link">Offers</Link>
                                <Link to="/provider-dashboard/orders" className="app-header__nav-link">Orders</Link>
                            </nav>
                        ) : null
                    ) : (
                        // Guest User
                        <nav className="app-header__nav">
                            <Link to="/browse" className="app-header__nav-link">Marketplace</Link>
                            <Link to="/#how-it-works" className="app-header__nav-link">How it Works</Link>
                            <Link to="/contact-us" className="app-header__nav-link">Support</Link>
                        </nav>
                    )}
                </div>

                {/* Right Section: Actions */}
                <div className="app-header__right">
                    {user ? (
                        <>
                            {/* Conditional Search: Bar on Search Page, Icon elsewhere */}
                            {activeRole !== 'service_provider' && (
                                location.pathname === '/search' ? (
                                    <div className="flex-1 w-full max-w-[600px] mx-4">
                                        <div className="app-header__search">
                                            <Search size={18} className="app-header__search-icon" />
                                            <input
                                                type="text"
                                                placeholder="Search for furniture, mattresses..."
                                                defaultValue={new URLSearchParams(location.search).get('q') || ''}
                                                onChange={(e) => {
                                                    const query = e.target.value;
                                                    const searchParams = new URLSearchParams(location.search);
                                                    if (query) {
                                                        searchParams.set('q', query);
                                                    } else {
                                                        searchParams.delete('q');
                                                    }
                                                    // Use replace: true to update URL without adding history entries for every character
                                                    // casting to any to bypass strict type checking if needed relative path
                                                    navigate({ search: searchParams.toString() } as any, { replace: true });
                                                }}
                                                // Using onKeyDown to handle "Enter" if we want to push navigation history?
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        // Standard navigation
                                                        // navigate(...)
                                                    }
                                                }}
                                                className="w-full bg-transparent border-none focus:outline-none"
                                                autoFocus
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <Link to="/search" className="app-header__action-btn" aria-label="Search">
                                        <Search size={22} />
                                    </Link>
                                )
                            )}
                            <button className="app-header__action-btn" onClick={openMessages} aria-label="Messages">
                                <MessageSquare size={22} />
                                <span className="app-header__badge">3</span>
                            </button>
                            <button className="app-header__profile-btn" onClick={openProfile} aria-label="Profile">
                                <div className="app-header__avatar">
                                    <User size={20} />
                                    <div className="app-header__avatar-status" />
                                </div>
                            </button>
                        </>
                    ) : (
                        <div className="app-header__auth-btns">
                            <button className="app-header__login-btn" onClick={openProfile}>
                                Login
                            </button>
                            <button className="app-header__signup-btn" onClick={openProfile}>
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

