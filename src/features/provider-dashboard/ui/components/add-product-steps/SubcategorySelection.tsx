import React from 'react';
import { Search } from 'lucide-react';

interface Subcategory {
    id: string;
    name: string;
    image: string;
}

const SUBCATEGORIES: Subcategory[] = [
    { id: 'cars', name: 'Cars', image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&q=80' },
    { id: 'suvs', name: 'SUVs', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&q=80' },
    { id: 'campers', name: 'Campers', image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=500&q=80' },
    { id: 'trucks', name: 'Trucks', image: 'https://images.unsplash.com/photo-1586191582151-f746732381a1?w=500&q=80' },
    { id: 'vans', name: 'Vans', image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?w=500&q=80' },
    { id: 'buses', name: 'Buses', image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&q=80' },
    { id: 'boats', name: 'Boats', image: 'https://images.unsplash.com/photo-1540946484711-45d509e2636a?w=500&q=80' },
    { id: 'watercraft', name: 'Watercraft', image: 'https://images.unsplash.com/photo-1563299796-17596ed6b017?w=500&q=80' },
    { id: 'off-road', name: 'Off-road Vehicles', image: 'https://images.unsplash.com/photo-1506469717960-433cebe3f181?w=500&q=80' },
    { id: 'snow', name: 'Snow Vehicles', image: 'https://images.unsplash.com/photo-1517154421773-052319ef476c?w=500&q=80' }
];

interface SubcategorySelectionProps {
    categoryName: string;
    categoryImage: string;
    onSelect: (subcategory: Subcategory) => void;
    onNext: () => void;
    selectedSubcategory: Subcategory | null;
}

export const SubcategorySelection: React.FC<SubcategorySelectionProps> = ({
    categoryName,
    categoryImage,
    onSelect,
    onNext,
    selectedSubcategory
}) => {
    return (
        <div className="step-content">
            <div className="search-container">
                <Search size={20} className="search-icon" />
                <input type="text" placeholder="Search..." className="search-input" />
            </div>

            <div className="selected-category-banner">
                <img src={categoryImage} alt={categoryName} className="banner-image" />
                <div className="banner-info">
                    <span className="banner-label">Category</span>
                    <span className="banner-value">{categoryName}</span>
                </div>
            </div>

            <div className="subcategory-grid">
                {SUBCATEGORIES.map((sub) => (
                    <button
                        key={sub.id}
                        className={`subcategory-card ${selectedSubcategory?.id === sub.id ? 'selected' : ''}`}
                        onClick={() => onSelect(sub)}
                    >
                        <img src={sub.image} alt={sub.name} className="subcategory-image" />
                        <div className="subcategory-overlay">
                            <span className="subcategory-name">{sub.name}</span>
                        </div>
                    </button>
                ))}
            </div>

            <div className="step-footer">
                <button
                    className="next-btn"
                    disabled={!selectedSubcategory}
                    onClick={onNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
};
