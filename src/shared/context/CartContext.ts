import { createContext } from 'react';
import type { Product, CartItem } from '../types/product';

export interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    signedIn: boolean;
    busy: boolean;
    error: string;
    advisory: string;
    refresh: () => void;
    saveDates: (id: string, start: string, end: string, quantity: number) => void;
    checkAvailability: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);
