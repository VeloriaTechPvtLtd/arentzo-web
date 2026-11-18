'use client';

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import type { Product, CartItem } from '../types/product';
import { CartContext } from './CartContext';
import { loadCart, saveCart } from './cartStorage.js';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [storageReady, setStorageReady] = useState(false);

    useEffect(() => {
        // Read after hydration so server HTML and the first client render stay identical.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(loadCart(window.localStorage));
        setStorageReady(true);
    }, []);

    useEffect(() => {
        if (storageReady) saveCart(window.localStorage, items);
    }, [items, storageReady]);

    const addToCart = useCallback((product: Product, quantity: number = 1) => {
        setItems(prev => {
            const existing = prev.find(item => item.product.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prev, { id: product.id, product, quantity }];
        });
    }, []);

    const removeFromCart = useCallback((productId: string) => {
        setItems(prev => prev.filter(item => item.product.id !== productId));
    }, []);

    const updateQuantity = useCallback((productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setItems(prev => prev.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
        ));
    }, [removeFromCart]);

    const clearCart = useCallback(() => setItems([]), []);

    const totalItems = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
    const totalPrice = useMemo(() => items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0), [items]);

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice
        }}>
            {children}
        </CartContext.Provider>
    );
};
