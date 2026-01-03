import React, { useRef, useEffect } from 'react';
import {
    LayoutGrid,
    Car,
    Home,
    Trees,
    Laptop,
    PartyPopper,
    Briefcase,
    Shirt,
    Dumbbell,
    HeartPulse,
    Box,
} from 'lucide-react';

interface Category {
    id: string;
    name: string;
    icon: string;
}

interface CategoryTabsProps {
    categories: Category[];
    activeCategory: string;
    onCategoryChange: (categoryId: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
    LayoutGrid,
    Car,
    Home,
    Trees,
    Laptop,
    PartyPopper,
    Briefcase,
    Shirt,
    Dumbbell,
    HeartPulse,
    Box,
};

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
    categories,
    activeCategory,
    onCategoryChange,
}) => {
    const tabsRef = useRef<HTMLDivElement>(null);
    const activeTabRef = useRef<HTMLButtonElement>(null);

    // Scroll active tab into view
    useEffect(() => {
        if (activeTabRef.current && tabsRef.current) {
            const container = tabsRef.current;
            const activeTab = activeTabRef.current;
            const containerRect = container.getBoundingClientRect();
            const activeTabRect = activeTab.getBoundingClientRect();

            const scrollLeft =
                activeTab.offsetLeft -
                container.offsetWidth / 2 +
                activeTab.offsetWidth / 2;

            container.scrollTo({
                left: Math.max(0, scrollLeft),
                behavior: 'smooth',
            });
        }
    }, [activeCategory]);

    const allCategories = [
        { id: 'all', name: 'All', icon: 'LayoutGrid' },
        ...categories,
    ];

    return (
        <nav className="category-tabs">
            <div className="category-tabs__container" ref={tabsRef}>
                {allCategories.map((category) => {
                    const IconComponent = iconMap[category.icon] || LayoutGrid;
                    const isActive = category.id === activeCategory;

                    return (
                        <button
                            key={category.id}
                            ref={isActive ? activeTabRef : null}
                            className={`category-tabs__tab ${isActive ? 'category-tabs__tab--active' : ''}`}
                            onClick={() => onCategoryChange(category.id)}
                        >
                            <span className="category-tabs__icon">
                                <IconComponent size={20} />
                            </span>
                            <span className="category-tabs__label">
                                {category.name.split(' ')[0]}
                            </span>
                            {isActive && <span className="category-tabs__indicator" />}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};
