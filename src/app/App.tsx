import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/AppRouter';
import { AuthProvider } from '../features/auth/ui/context/AuthContext';
import { CartProvider } from '../shared/context/CartProvider';
import { DrawerProvider } from '../shared/context/DrawerProvider';

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
