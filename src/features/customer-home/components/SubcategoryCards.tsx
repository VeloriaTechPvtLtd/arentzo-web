import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Subcategory {
    name: string;
    image?: string;
    examples: string[];
}

interface SubcategoryCardsProps {
    subcategories: Subcategory[];
    categoryColor?: string;
    onSubcategoryClick?: (subcategory: Subcategory) => void;
}

// Fallback images for subcategories
const fallbackImages: Record<string, string> = {
    Cars: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&auto=format&fit=crop',
    SUVs: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&auto=format&fit=crop',
    Campers: 'https://images.unsplash.com/photo-1564866657315-6c1e7d0a83c5?w=400&auto=format&fit=crop',
    Trucks: 'https://images.unsplash.com/photo-1566933293069-b55c7f326dd4?w=400&auto=format&fit=crop',
    Vans: 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=400&auto=format&fit=crop',
    Buses: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&auto=format&fit=crop',
    Boats: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=400&auto=format&fit=crop',
    Watercraft: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&auto=format&fit=crop',
    Computers: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&auto=format&fit=crop',
    Cameras: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop',
    'Camera Accessories': 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?w=400&auto=format&fit=crop',
    Gaming: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&auto=format&fit=crop',
    'Audio Equipment': 'https://images.unsplash.com/photo-1558537348-c0f8e733989d?w=400&auto=format&fit=crop',
    'Water Sports': 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&auto=format&fit=crop',
    'Snow Sports': 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&auto=format&fit=crop',
    'Camping Gear': 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&auto=format&fit=crop',
    'Fitness Gear': 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&auto=format&fit=crop',
    'Musical Instruments': 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&auto=format&fit=crop',
    Laptops: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&auto=format&fit=crop',
    Accessories: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e8?w=400&auto=format&fit=crop',
};

export const SubcategoryCards: React.FC<SubcategoryCardsProps> = ({
    subcategories,
    categoryColor = '#ff7e5f',
    onSubcategoryClick,
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 220;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    // Take only first 3-5 subcategories for display
    const displaySubcategories = subcategories.slice(0, 5);

    return (
        <div className="subcategory-cards">
            <button
                className="subcategory-cards__nav subcategory-cards__nav--left"
                onClick={() => scroll('left')}
                aria-label="Scroll left"
            >
                <ChevronLeft size={20} />
            </button>

            <div className="subcategory-cards__container" ref={scrollRef}>
                {displaySubcategories.map((subcategory, index) => (
                    <button
                        key={subcategory.name}
                        className="subcategory-card"
                        onClick={() => onSubcategoryClick?.(subcategory)}
                        style={{
                            '--card-delay': `${index * 0.1}s`,
                        } as React.CSSProperties}
                    >
                        <div
                            className="subcategory-card__overlay"
                            style={{ backgroundColor: categoryColor }}
                        />
                        <span className="subcategory-card__name">
                            {subcategory.name}
                        </span>
                        <div className="subcategory-card__image-container">
                            <img
                                src={subcategory.image || fallbackImages[subcategory.name] || `https://images.unsplash.com/photo-1557200134-90327ee9fafa?w=400&auto=format&fit=crop`}
                                alt={subcategory.name}
                                className="subcategory-card__image"
                                loading="lazy"
                            />
                        </div>
                    </button>
                ))}
            </div>

            <button
                className="subcategory-cards__nav subcategory-cards__nav--right"
                onClick={() => scroll('right')}
                aria-label="Scroll right"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};
