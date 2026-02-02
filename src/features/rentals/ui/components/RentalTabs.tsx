import React, { useRef, useEffect } from 'react';
import type { RentalStatus } from '../../domain/entities';

export interface RentalTab {
    id: RentalStatus | 'all';
    label: string;
    icon: React.ElementType;
}

interface RentalTabsProps {
    tabs: RentalTab[];
    activeTab: string;
    onTabChange: (tabId: RentalStatus | 'all') => void;
}

export const RentalTabs: React.FC<RentalTabsProps> = ({
    tabs,
    activeTab,
    onTabChange,
}) => {
    const tabsRef = useRef<HTMLDivElement>(null);
    const activeTabRef = useRef<HTMLButtonElement>(null);

    // Scroll active tab into view
    useEffect(() => {
        if (activeTabRef.current && tabsRef.current) {
            const container = tabsRef.current;
            const activeTabElement = activeTabRef.current;

            const scrollLeft =
                activeTabElement.offsetLeft -
                container.offsetWidth / 2 +
                activeTabElement.offsetWidth / 2;

            container.scrollTo({
                left: Math.max(0, scrollLeft),
                behavior: 'smooth',
            });
        }
    }, [activeTab]);

    return (
        <nav className="rental-tabs">


            <div className="rental-tabs__container" ref={tabsRef}>
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = tab.id === activeTab;

                    return (
                        <button
                            key={tab.id}
                            ref={isActive ? activeTabRef : null}
                            className={`rental-tabs__tab ${isActive ? 'rental-tabs__tab--active' : ''}`}
                            onClick={() => onTabChange(tab.id)}
                        >
                            <span className="rental-tabs__icon">
                                <Icon size={20} />
                            </span>
                            <span className="rental-tabs__label">
                                {tab.label}
                            </span>
                            {isActive && <span className="rental-tabs__indicator" />}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};
