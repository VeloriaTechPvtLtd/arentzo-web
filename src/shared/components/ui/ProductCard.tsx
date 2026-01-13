import React from 'react';
import { Heart, Star, Plus, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { Product } from '../../types/product';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
    onFavoriteToggle?: (productId: string) => void;
    onAddToCart?: (productId: string) => void;
    onQuantityChange?: (productId: string, quantity: number) => void;
    className?: string;
    variant?: 'default' | 'compact' | 'search';
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onFavoriteToggle,
    onAddToCart,
    onQuantityChange,
    className,
    variant = 'default',
}) => {
    const navigate = useNavigate();
    const quantity = product.quantity || 0;
    const isOutOfStock = product.isAvailable === false;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price / 100);
    };

    const handleCardClick = () => {
        navigate(`/product/${product.id}`);
    };

    const handleAction = (e: React.MouseEvent, action: () => void) => {
        e.stopPropagation();
        action();
    };

    const renderStars = (rating: number) => {
        return (
            <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        size={variant === 'compact' ? 10 : 12}
                        className={cn(
                            "transition-colors",
                            i < Math.floor(rating)
                                ? "fill-[var(--chart-2)] text-[var(--chart-2)]"
                                : "text-[var(--muted-foreground)]/30"
                        )}
                    />
                ))}
            </div>
        );
    };

    return (
        <div
            onClick={handleCardClick}
            className={cn(
                "group relative bg-[var(--card)] rounded-[var(--radius)] border border-[var(--border)]",
                "transition-all duration-300 ease-out hover:shadow-xl hover:border-[var(--primary)]/30",
                "cursor-pointer overflow-hidden flex flex-col h-full",
                className
            )}
        >
            {/* Image Section */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[var(--muted)]/30">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    loading="lazy"
                />

                {/* Badges Overlay */}
                <div className="absolute top-2 left-2 flex flex-col gap-1.5 pointer-events-none">
                    {product.isImported && (
                        <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-[var(--accent)] text-[var(--primary-foreground)] rounded-full shadow-sm backdrop-blur-md">
                            Imported
                        </span>
                    )}
                    {product.discount && (
                        <span className="px-2 py-0.5 text-[9px] font-bold bg-[var(--destructive)] text-white rounded-full shadow-sm">
                            {product.discount}% OFF
                        </span>
                    )}
                </div>

                {/* Favorite Toggle */}
                <button
                    onClick={(e) => handleAction(e, () => onFavoriteToggle?.(product.id))}
                    className={cn(
                        "absolute top-2 right-2 p-2 rounded-full backdrop-blur-md transition-all duration-300",
                        "bg-[var(--card)]/80 border border-[var(--border)] group/fav",
                        "hover:bg-[var(--primary)]/10 hover:border-[var(--primary)]/30 active:scale-90",
                        (product.isFavorite || product.isWishlisted) && "bg-[var(--primary)]/10 border-[var(--primary)]/30"
                    )}
                >
                    <Heart
                        size={16}
                        className={cn(
                            "transition-all duration-300",
                            (product.isFavorite || product.isWishlisted)
                                ? "fill-[var(--primary)] text-[var(--primary)] scale-110"
                                : "text-[var(--foreground)] group-hover/fav:text-[var(--primary)]"
                        )}
                    />
                </button>

                {/* Quick Add Overlay (Mobile Friendly) */}
                {!isOutOfStock && quantity === 0 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 w-[85%]">
                        <button
                            onClick={(e) => handleAction(e, () => onAddToCart?.(product.id))}
                            className="w-full py-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg text-xs font-bold shadow-lg flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
                        >
                            <Plus size={14} />
                            ADD TO CART
                        </button>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-3 flex flex-col flex-grow gap-2">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-medium text-[var(--muted-foreground)] uppercase tracking-wide">
                            {product.brand || 'Premium Quality'}
                        </span>
                        <div className="flex items-center gap-1">
                            {renderStars(product.rating)}
                            <span className="text-[10px] text-[var(--muted-foreground)] font-semibold">
                                ({product.reviewCount})
                            </span>
                        </div>
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--foreground)] line-clamp-2 min-h-[2.5rem] leading-tight group-hover:text-[var(--primary)] transition-colors">
                        {product.name}
                    </h3>
                </div>

                {/* Pricing & Actions */}
                <div className="mt-auto flex items-end justify-between">
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-[var(--foreground)] flex items-baseline leading-none">
                            {formatPrice(product.price)}
                        </span>
                        {product.originalPrice && (
                            <span className="text-[10px] text-[var(--muted-foreground)] line-through">
                                {formatPrice(product.originalPrice)}
                            </span>
                        )}
                    </div>

                    {/* Quantity Selector / Add Button for Small Screens or Hover */}
                    {quantity > 0 ? (
                        <div className="flex items-center gap-2 bg-[var(--muted)]/50 rounded-full p-1 border border-[var(--border)] shadow-inner">
                            <button
                                onClick={(e) => handleAction(e, () => onQuantityChange?.(product.id, quantity - 1))}
                                className="p-1 rounded-full hover:bg-[var(--card)] transition-colors text-[var(--foreground)]"
                            >
                                <Minus size={14} />
                            </button>
                            <span className="text-xs font-bold min-w-[1.2rem] text-center">{quantity}</span>
                            <button
                                onClick={(e) => handleAction(e, () => onQuantityChange?.(product.id, quantity + 1))}
                                className="p-1 rounded-full hover:bg-[var(--card)] transition-colors text-[var(--foreground)]"
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                    ) : isOutOfStock ? (
                        <span className="text-[10px] font-bold text-[var(--destructive)] uppercase">Out of Stock</span>
                    ) : (
                        <div className="sm:hidden">
                            <button
                                onClick={(e) => handleAction(e, () => onAddToCart?.(product.id))}
                                className="p-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg shadow-sm active:scale-95"
                            >
                                <Plus size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const ProductCardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <div className={cn("bg-[var(--card)] rounded-[var(--radius)] border border-[var(--border)] overflow-hidden animate-pulse", className)}>
            <div className="aspect-[4/5] bg-[var(--muted)]" />
            <div className="p-3 space-y-3">
                <div className="flex justify-between">
                    <div className="h-2 w-16 bg-[var(--muted)] rounded" />
                    <div className="h-2 w-12 bg-[var(--muted)] rounded" />
                </div>
                <div className="space-y-2">
                    <div className="h-3 w-full bg-[var(--muted)] rounded" />
                    <div className="h-3 w-2/3 bg-[var(--muted)] rounded" />
                </div>
                <div className="flex justify-between items-end">
                    <div className="h-5 w-20 bg-[var(--muted)] rounded" />
                    <div className="h-8 w-8 bg-[var(--muted)] rounded-lg" />
                </div>
            </div>
        </div>
    );
};
