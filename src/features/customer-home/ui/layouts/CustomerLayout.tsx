import React from 'react';
import { Footer } from '../../../../shared/components/layout/Footer';
import { FloatingCart } from '../../../../shared/components/cart/FloatingCart';
import { useCart } from '../../../../shared/hooks/useCart';
import { useDrawer } from '../../../../shared/hooks/useDrawer';
import { CustomerBottomNav } from '../../../../shared/components/layout/CustomerBottomNav';
import '../styles/CustomerHome.css';

interface CustomerLayoutProps {
    children: React.ReactNode;
    className?: string;
}

export const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children, className = '' }) => {
    const { items, totalItems } = useCart();
    const { openCheckout } = useDrawer();

    return (
        <div className={`customer-home ${className}`}>
            {children}

            {items.length > 0 && (
                <FloatingCart
                    items={items.map(item => ({ id: item.id, image: item.product.image }))}
                    totalItems={totalItems}
                    onViewCart={openCheckout}
                />
            )}

            <CustomerBottomNav />

            <Footer />
        </div>
    );
};
