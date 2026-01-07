import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeHeader } from '../HomeHeader';
import { Footer } from '../../../../shared/components/layout/Footer';
import { FloatingCart } from '../FloatingCart';
import { useCart } from '../../context/CartContext';
import { useDrawer } from '../../../../shared/context/DrawerContext';
import { useAuth } from '../../../auth/context/AuthContext';
import '../../CustomerHome.css';

interface CustomerLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children, className = '' }) => {
    const navigate = useNavigate();
    const { cartItems } = useCart();
    const {
        openProfile,
        openCheckout,
        openMessages,
        openLocation
    } = useDrawer();
    const { user } = useAuth();

    const userName = user ? (user.email?.split('@')[0] || 'User') : 'Friend';
    const greeting = user ? `Hello, ${userName}` : 'Welcome to Arentzo';

    return (
        <div className={`customer-home ${className}`}>
            <HomeHeader
                userName={greeting}
                isLoggedIn={!!user}
                location="BEML Layout, Brookefield"
                messageCount={3}
                onSearchClick={() => navigate('/search')}
                onProfileClick={openProfile}
                onLocationClick={openLocation}
                onMessageClick={openMessages}
            />

            {children}

            {cartItems.length > 0 && (
                <FloatingCart
                    items={cartItems}
                    totalItems={cartItems.length}
                    onViewCart={openCheckout}
                />
            )}

            <Footer />
        </div>
    );
};
