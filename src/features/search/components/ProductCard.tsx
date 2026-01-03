
import React from 'react';
import { Heart, Star } from 'lucide-react';

export interface Product {
    id: string;
    image: string;
    title: string;
    rating: number;
    reviewCount: number;
    price: number;
    isImported?: boolean;
    isWishlisted?: boolean;
}

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="flex flex-col gap-2 p-2 relative bg-white rounded-lg">
            {/* Image Container */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                />

                {/* Imported Badge */}
                {product.isImported && (
                    <div className="absolute top-2 left-2 bg-[#ffaa5f] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wide">
                        Imported
                    </div>
                )}

                {/* Wishlist Button */}
                <button className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors">
                    <Heart size={16} className={product.isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"} />
                </button>

                {/* ADD Button */}
                <button className="absolute bottom-[-14px] right-2 bg-white text-[#ff7e5f] text-xs font-bold py-1 px-4 rounded-lg shadow-sm border border-[#ffedea] uppercase hover:bg-[#ffedea] transition-colors">
                    Add
                </button>
            </div>

            {/* Content */}
            <div className="mt-2 flex flex-col gap-1">
                <h3 className="text-sm font-semibold text-[#3d3436] line-clamp-2 leading-tight">
                    {product.title}
                </h3>

                {/* Rating */}
                <div className="flex items-center gap-1">
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={12}
                                className={`${star <= Math.round(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                            />
                        ))}
                    </div>
                    <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
                </div>

                {/* Price */}
                <div className="font-bold text-[#3d3436]">
                    ₹{product.price.toLocaleString()}
                </div>
            </div>
        </div>
    );
};
