// Types for Customer Home Feature

export interface Category {
    id: string;
    name: string;
    icon: string;
    color?: string;
    gradient?: string;
    backgroundPattern?: string;
    subcategories: Subcategory[];
}

export interface Subcategory {
    name: string;
    image?: string;
    examples: string[];
}

export interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    rating: number;
    reviewCount: number;
    isImported?: boolean;
    isAvailable?: boolean;
    isFavorite?: boolean;
    quantity?: number;
    features?: string[];
}

export interface CategoryTheme {
    primary: string;
    gradient: string;
    backgroundPattern?: string;
    tagline: string;
    subtitle?: string;
}

export interface CartItem {
    id: string;
    product: Product;
    quantity: number;
}

export interface TopSelection {
    id: string;
    name: string;
    images: string[];
    itemCount: number;
}
