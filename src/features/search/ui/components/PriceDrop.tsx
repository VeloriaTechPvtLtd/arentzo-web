import React from 'react';
import { ProductCard } from '../../../../shared/components/ui/ProductCard';
import { ChevronRight } from 'lucide-react';
import type { Product } from '../../../customer-home/domain/entities/types';

interface DealItem {
    id: string;
    title: string;
    image: string;
    rating: number;
    reviewCount: number;
    price: number;
    originalPrice?: number;
    discountTag?: string;
}

interface PriceDropProps {
    items: DealItem[];
}

export const PriceDrop: React.FC<PriceDropProps> = ({ items }) => {
    if (items.length === 0) return null;

    return (
        <section className="search-section bg-gradient-to-b from-transparent to-[var(--primary)]/5">
            <div className="search-section-header">
                <div className="flex flex-col">
                    <h3 className="search-section-title">Biggest Price Drops</h3>
                    <p className="text-[10px] text-[var(--muted-foreground)] font-semibold uppercase tracking-widest mt-0.5">Live Deals Ending Soon</p>
                </div>
                <button className="search-section-action flex items-center gap-1">
                    See All <ChevronRight size={14} />
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {items.map((item) => (
                    <ProductCard
                        key={item.id}
                        product={{
                            id: item.id,
                            name: item.title,
                            image: item.image,
                            rating: item.rating,
                            reviewCount: item.reviewCount,
                            price: item.price,
                            originalPrice: (item.originalPrice || (item.price * 1.2)),
                            isAvailable: true,
                            brand: 'Exclusive Deal',
                            category: 'Furniture',
                            description: item.title,
                            discount: 20,
                            isFavorite: false,
                            specifications: [],
                            rentalOptions: [],
                            deliveryFee: 0,
                            securityDeposit: 0
                        } as Product}
                    />
                ))}
            </div>
        </section>
    );
};

