import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/AppRouter';
import { AuthProvider } from '../features/auth/context/AuthContext';
import { CartProvider } from '../features/customer-home/context/CartContext';
import { DrawerProvider } from '../shared/context/DrawerContext';

export const App: React.FC = () => {
    return (
        <AuthProvider>
            <DrawerProvider>
                <CartProvider>
                    <RouterProvider router={router} />
                </CartProvider>
            </DrawerProvider>
        </AuthProvider>
    );
};
