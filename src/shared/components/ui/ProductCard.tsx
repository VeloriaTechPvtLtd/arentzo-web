'use client';

import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { Heart, Plus, Minus, ImageOff } from 'lucide-react';
import { cn } from '../../utils/cn';
import type { Product } from '../../types/product';
import { useRouter } from 'next/navigation';

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
    const { t } = useTranslation();
    const router = useRouter();
    const [failedImage, setFailedImage] = useState<string | null>(null);
    const hasPhoto = Boolean(product.image && product.image !== "/placeholder.svg" && failedImage !== product.image);
    const quantity = product.quantity || 0;
    const isOutOfStock = product.isAvailable === false;

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: product.currency || 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(price);
    };

    const handleCardClick = () => {
    router.push(`/product/?id=${encodeURIComponent(product.id)}`);
    };

    const handleAction = (e: React.MouseEvent, action: () => void) => {
        e.stopPropagation();
        action();
    };

    return (
        <div
            onClick={handleCardClick}
            onKeyDown={(event) => { if (event.target === event.currentTarget && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); handleCardClick(); } }}
            role="link"
            tabIndex={0}
            aria-label={`View ${product.name}`}
            className={cn(
                "group relative bg-[var(--card)] rounded-[var(--radius)] border border-[var(--border)]",
                "transition-all duration-300 ease-out hover:shadow-xl hover:border-[var(--primary)]/30",
                "cursor-pointer overflow-hidden flex flex-col h-full",
                className
            )}
        >
            {/* Image Section */}
            <div className={cn("relative overflow-hidden bg-[var(--muted)]/30", variant === 'compact' ? 'aspect-square' : 'aspect-[4/3]')}>
                {hasPhoto ? <img
                    src={product.image} alt={product.name}
                    onError={() => setFailedImage(product.image)}
                    className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                /> : <div className="h-full flex flex-col items-center justify-center gap-2 text-muted-foreground p-3 text-center"><ImageOff size={24} aria-hidden="true" /><span className="text-xs">{t('mobileRental.photoMissing')}</span></div>}


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
                    aria-label={`${product.isFavorite || product.isWishlisted ? 'Remove' : 'Add'} ${product.name} ${product.isFavorite || product.isWishlisted ? 'from' : 'to'} favorites`}
                    aria-pressed={Boolean(product.isFavorite || product.isWishlisted)}
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
                            {product.brand || 'Rental listing'}
                        </span>
                        {product.reviewCount > 0 && <span className="text-[10px] text-[var(--muted-foreground)] font-semibold">{product.rating.toFixed(1)} · {product.reviewCount} reviews</span>}
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--foreground)] line-clamp-2 min-h-[2.5rem] leading-tight group-hover:text-[var(--primary)] transition-colors">
                        {product.name}
                    </h3>
                </div>

                {/* Pricing & Actions */}
                <div className="mt-auto flex flex-col items-stretch justify-between gap-2 sm:flex-row sm:flex-wrap sm:items-end">
                    <div className="flex flex-col">
                        <span className="text-base font-bold text-[var(--foreground)] flex flex-wrap items-baseline gap-1 leading-tight">
                            {formatPrice(product.price)} <span className="text-xs font-medium text-muted-foreground">/ day</span>
                        </span>
                        {product.originalPrice && (
                            <span className="text-[10px] text-[var(--muted-foreground)] line-through">
                                {formatPrice(product.originalPrice)} / day
                            </span>
                        )}
                    </div>

                    {/* Quantity Selector / Add Button for Small Screens or Hover */}
                    {quantity > 0 ? (
                        <div className="flex items-center gap-2 bg-[var(--muted)]/50 rounded-full p-1 border border-[var(--border)] shadow-inner">
                            <button
                                aria-label={`${t('mobileRental.removeOne')}: ${product.name}`}
                                onClick={(e) => handleAction(e, () => onQuantityChange?.(product.id, quantity - 1))}
                                className="p-1 rounded-full hover:bg-[var(--card)] transition-colors text-[var(--foreground)]"
                            >
                                <Minus size={14} />
                            </button>
                            <span className="text-xs font-bold min-w-[1.2rem] text-center">{quantity}</span>
                            <button
                                aria-label={`${t('mobileRental.addOne')}: ${product.name}`}
                                onClick={(e) => handleAction(e, () => onQuantityChange?.(product.id, quantity + 1))}
                                className="p-1 rounded-full hover:bg-[var(--card)] transition-colors text-[var(--foreground)]"
                            >
                                <Plus size={14} />
                            </button>
                        </div>
                    ) : isOutOfStock ? (
                        <span className="text-[10px] font-bold text-[var(--destructive)] uppercase">Out of Stock</span>
                    ) : (
                        <div className="sm:hidden w-full">
                            <button
                                onClick={(e) => handleAction(e, () => onAddToCart?.(product.id))}
                                aria-label={t('mobileRental.addItem', { name: product.name })}
                                className="w-full min-w-10 min-h-10 flex items-center justify-center gap-1 p-2 bg-[var(--primary)] text-[var(--primary-foreground)] rounded-lg shadow-sm active:scale-95"
                            >
                                <Plus size={16} aria-hidden="true" /><span className="text-xs font-semibold">Add</span>
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
