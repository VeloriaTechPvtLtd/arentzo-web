import React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
    User,
    Search,
    Mic,
    MapPin,
    ChevronDown,
    MessageSquare,
    Bell,
    Box
} from 'lucide-react';
import { useAuth } from '../../../features/auth/context/AuthContext';
import { useDrawer } from '../../context/DrawerContext';
import './AppHeader.css';

export const AppHeader: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, activeRole } = useAuth();
    const {
        openProfile,
        openMessages,
        openLocation
    } = useDrawer();

    const isProvider = activeRole === 'service_provider';
    const isAuthPage = ['/login', '/signup', '/forgot-password', '/verify-otp', '/reset-password'].includes(location.pathname);

    if (isAuthPage) return null;

    const userName = user ? (user.email?.split('@')[0] || 'User') : 'Friend';
    const greeting = user ? `Hello, ${userName}` : 'Welcome to Arentzo';

    return (
        <header className={`app-header ${isProvider ? 'app-header--provider' : ''}`}>
            <div className="app-header__container">
                {/* Left Section: User Info or Logo */}
                <div className="app-header__left">
                    {isProvider ? (
                        <Link to="/provider-dashboard" className="app-header__logo">
                            <div className="app-header__logo-icon">
                                <Box size={24} />
                            </div>
                            <span className="app-header__logo-text">Provider Hub</span>
                        </Link>
                    ) : (
                        <div className="app-header__user-info" onClick={openLocation}>
                            <h2 className="app-header__greeting">{greeting}</h2>
                            <div className="app-header__location">
                                <MapPin size={14} />
                                <span>BEML Layout, Brookefield</span>
                                <ChevronDown size={14} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Middle Section: Search or Navigation */}
                <div className="app-header__center">
                    {!isProvider ? (
                        <>
                            {location.pathname === '/' || location.pathname === '/home' ? (
                                <nav className="app-header__nav">
                                    <Link to="/browse" className="app-header__nav-link">Marketplace</Link>
                                    <Link to="/#how-it-works" className="app-header__nav-link">How it Works</Link>
                                    <Link to="/contact-us" className="app-header__nav-link">Support</Link>
                                </nav>
                            ) : location.pathname !== '/search' ? (
                                <button className="app-header__search" onClick={() => navigate('/search')}>
                                    <Search size={18} className="app-header__search-icon" />
                                    <span className="app-header__search-placeholder">Search products...</span>
                                    <Mic size={18} className="app-header__mic-icon" />
                                </button>
                            ) : null}
                        </>
                    ) : (
                        <nav className="app-header__nav">
                            <Link to="/provider-dashboard" className={`app-header__nav-link ${location.pathname === '/provider-dashboard' ? 'app-header__nav-link--active' : ''}`}>Dashboard</Link>
                            <Link to="/provider-dashboard/products" className={`app-header__nav-link ${location.pathname === '/provider-dashboard/products' ? 'app-header__nav-link--active' : ''}`}>Products</Link>
                            <Link to="/provider-dashboard/offers" className={`app-header__nav-link ${location.pathname === '/provider-dashboard/offers' ? 'app-header__nav-link--active' : ''}`}>Offers</Link>
                        </nav>
                    )}
                </div>

                {/* Right Section: Actions */}
                <div className="app-header__right">
                    {user ? (
                        <>
                            <button className="app-header__action-btn" onClick={openMessages} aria-label="Messages">
                                <MessageSquare size={22} />
                                <span className="app-header__badge">3</span>
                            </button>
                            {!isProvider && (
                                <button className="app-header__action-btn" aria-label="Notifications">
                                    <Bell size={22} />
                                </button>
                            )}
                            <button className="app-header__profile-btn" onClick={openProfile} aria-label="Profile">
                                <div className="app-header__avatar">
                                    <User size={20} />
                                    <div className="app-header__avatar-status" />
                                </div>
                            </button>
                        </>
                    ) : (
                        <button className="app-header__login-btn" onClick={openProfile}>
                            Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};
