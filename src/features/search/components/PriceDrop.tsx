import React from 'react';
import { Heart } from 'lucide-react';

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
        <div className="py-4 bg-orange-50/30">
            <div className="px-4 mb-3">
                <h3 className="text-lg font-bold text-gray-900">Biggest price drop</h3>
                <p className="text-sm text-gray-500">See All LIVE Deals</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 px-4">
                {items.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm flex flex-col">
                        <div className="relative aspect-square p-4 bg-gray-50">
                            {item.discountTag && (
                                <span className="absolute top-2 left-2 bg-orange-400 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide">
                                    {item.discountTag}
                                </span>
                            )}
                            <button className="absolute top-2 right-2 p-1.5 bg-white/50 hover:bg-white rounded-full text-gray-500 hover:text-red-500 transition-colors">
                                <Heart className="w-4 h-4" />
                            </button>
                            <img src={item.image} alt={item.title} className="w-full h-full object-contain mix-blend-multiply" />

                            <button className="absolute bottom-2 right-2 bg-white text-orange-500 text-xs font-bold px-3 py-1.5 rounded-lg border border-orange-100 shadow-sm hover:bg-orange-50 active:bg-orange-100 uppercase tracking-wide">
                                ADD
                            </button>
                        </div>

                        <div className="p-3">
                            <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 leading-snug">{item.title}</h4>
                            <div className="flex items-center gap-1 mb-2">
                                <div className="flex text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'fill-current' : 'text-gray-200 fill-current'}`} viewBox="0 0 24 24">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-xs text-gray-400">({item.reviewCount})</span>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
