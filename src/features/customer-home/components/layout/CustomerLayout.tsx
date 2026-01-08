import React from 'react';
import { Footer } from '../../../../shared/components/layout/Footer';
import { FloatingCart } from '../FloatingCart';
import { useCart } from '../../context/CartContext';
import { useDrawer } from '../../../../shared/context/DrawerContext';
import '../../CustomerHome.css';

interface CustomerLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children, className = '' }) => {
    const { cartItems } = useCart();
    const { openCheckout } = useDrawer();

    return (
        <div className={`customer-home ${className}`}>
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
