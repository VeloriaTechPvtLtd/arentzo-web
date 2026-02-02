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
    isWishlisted?: boolean;
    quantity?: number;
    features?: string[];
    images?: string[];
    seller?: Seller;
    specifications?: Specification[];
    overview?: string;
    terms?: RentalTerm[];
    reviews?: Review[];
    // Additional fields from original shared/product.ts if needed
    brand?: string;
    category?: string;
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

export interface CartItem {
    id: string;
    product: Product;
    quantity: number;
}
