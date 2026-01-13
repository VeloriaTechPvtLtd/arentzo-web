import React from 'react';
import { X, Eye, ChevronRight } from 'lucide-react';

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
        <section className="search-section">
            <div className="search-section-header">
                <h3 className="search-section-title">Continue Browsing</h3>
                <button className="search-section-action flex items-center gap-1">
                    View All <ChevronRight size={14} />
                </button>
            </div>

            <div className="horizontal-scroll-container">
                {items.map((item) => (
                    <div key={item.id} className="continue-browsing-card flex-shrink-0">
                        <div className="relative group overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="continue-browsing-img transition-transform duration-500 group-hover:scale-110"
                            />

                            <div className="absolute top-2 left-2 bg-[var(--card)]/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[9px] font-bold text-[var(--muted-foreground)] flex items-center gap-1 border border-[var(--border)] shadow-sm">
                                <Eye className="w-2.5 h-2.5" />
                                <span>{item.viewedAt}</span>
                            </div>

                            <button className="absolute top-2 right-2 p-1.5 bg-[var(--card)]/90 backdrop-blur-md rounded-full hover:bg-[var(--destructive)] hover:text-white text-[var(--muted-foreground)] border border-[var(--border)] shadow-sm transition-colors active:scale-90">
                                <X className="w-3 h-3" />
                            </button>
                        </div>

                        <div className="continue-browsing-content">
                            <h4 className="font-bold text-[var(--foreground)] text-sm mb-0.5 truncate">{item.title}</h4>
                            <p className="text-[10px] text-[var(--muted-foreground)] font-medium uppercase tracking-wider">{item.productCount} Products</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};
