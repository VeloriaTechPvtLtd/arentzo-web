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
    images?: string[];
    seller?: Seller;
    specifications?: Specification[];
    overview?: string;
    terms?: RentalTerm[];
    reviews?: Review[];
}

export interface Seller {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    isVerified?: boolean;
}

export interface Specification {
    label: string;
    value: string;
}

export interface RentalTerm {
    id: string;
    icon: string;
    title: string;
    description: string;
}

export interface Review {
    id: string;
    userName: string;
    userAvatar: string;
    rating: number;
    date: string;
    comment: string;
    images?: string[];
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
