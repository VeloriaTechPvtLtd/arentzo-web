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
    isWishlisted?: boolean; // added for search compatibility
    quantity?: number;
    features?: string[];
    brand?: string;
    category?: string;
}
