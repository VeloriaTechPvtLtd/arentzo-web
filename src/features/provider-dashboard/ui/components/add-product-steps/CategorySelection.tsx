import React from 'react';
import { Search } from 'lucide-react';

interface Category {
    id: string;
    name: string;
    image: string;
}

const CATEGORIES: Category[] = [
    { id: 'travel', name: 'Travel', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80' },
    { id: 'essentials', name: 'Essentials', image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80' },
    { id: 'garden', name: 'Garden', image: 'https://images.unsplash.com/photo-1558904541-efa8c196b27d?w=800&q=80' },
    { id: 'tech', name: 'Tech', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80' }
];

interface CategorySelectionProps {
    onSelect: (category: Category) => void;
}

export const CategorySelection: React.FC<CategorySelectionProps> = ({ onSelect }) => {
    return (
        <div className="step-content">
            <div className="search-container">
                <Search size={20} className="search-icon" />
                <input type="text" placeholder="Search..." className="search-input" />
            </div>

            <div className="category-grid">
                {CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        className="category-card"
                        onClick={() => onSelect(cat)}
                    >
                        <img src={cat.image} alt={cat.name} className="category-image" />
                        <div className="category-overlay">
                            <span className="category-name">{cat.name}</span>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};
