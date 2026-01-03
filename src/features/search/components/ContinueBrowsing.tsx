import React from 'react';
import { X, Eye } from 'lucide-react';

interface BrowsingItem {
    id: string;
    title: string;
    productCount: number;
    image: string;
    viewedAt: string;
}

interface ContinueBrowsingProps {
    items: BrowsingItem[];
}

export const ContinueBrowsing: React.FC<ContinueBrowsingProps> = ({ items }) => {
    if (items.length === 0) return null;

    return (
        <div className="py-4">
            <h3 className="px-4 text-lg font-semibold text-gray-900 mb-3">Continue browsing for</h3>
            <div className="flex overflow-x-auto px-4 gap-4 pb-4 scrollbar-hide">
                {items.map((item) => (
                    <div key={item.id} className="min-w-[160px] max-w-[160px] flex-shrink-0 bg-orange-50/50 rounded-xl overflow-hidden border border-orange-100 flex flex-col">
                        <div className="relative h-32 w-full p-4 flex items-center justify-center">
                            <img src={item.image} alt={item.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />

                            <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] text-gray-600 flex items-center gap-1 border border-white/50">
                                <Eye className="w-3 h-3" />
                                <span>{item.viewedAt}</span>
                            </div>

                            <button className="absolute top-2 right-2 p-1 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white text-gray-400 hover:text-gray-600 border border-white/50">
                                <X className="w-3 h-3" />
                            </button>
                        </div>

                        <div className="p-3 bg-white border-t border-orange-50 flex-1">
                            <h4 className="font-semibold text-gray-900 mb-0.5">{item.title}</h4>
                            <p className="text-xs text-gray-500">{item.productCount} Products</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
