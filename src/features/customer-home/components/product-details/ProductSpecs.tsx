import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Specification } from '../../types';

interface ProductSpecsProps {
    overview: string;
    specifications: Specification[];
}

export const ProductSpecs: React.FC<ProductSpecsProps> = ({ overview, specifications }) => {
    const [isDescriptionOpen, setIsDescriptionOpen] = React.useState(true);
    const [isOverviewOpen, setIsOverviewOpen] = React.useState(false);
    const [isSpecsOpen, setIsSpecsOpen] = React.useState(false);

    return (
        <div className="product-specs-container">
            {/* Short Description Toggle */}
            <div className="specs-section">
                <div className="specs-content">
                    <p className={`description-text ${!isDescriptionOpen ? 'clamped' : ''}`}>
                        {overview}
                    </p>
                    <button className="view-details-toggle" onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}>
                        {isDescriptionOpen ? 'Hide Product Details' : 'View Product Details'}
                        {isDescriptionOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                </div>
            </div>

            {/* Collapsible Overview */}
            <div className={`collapsible-section ${isOverviewOpen ? 'open' : ''}`}>
                <button className="collapsible-trigger" onClick={() => setIsOverviewOpen(!isOverviewOpen)}>
                    <span>Overview</span>
                    <ChevronDown size={20} className="trigger-icon" />
                </button>
                {isOverviewOpen && (
                    <div className="collapsible-content">
                        <p>{overview}</p>
                    </div>
                )}
            </div>

            {/* Collapsible Specs */}
            <div className={`collapsible-section ${isSpecsOpen ? 'open' : ''}`}>
                <button className="collapsible-trigger" onClick={() => setIsSpecsOpen(!isSpecsOpen)}>
                    <span>Specs</span>
                    <ChevronDown size={20} className="trigger-icon" />
                </button>
                {isSpecsOpen && (
                    <div className="collapsible-content">
                        <div className="specs-table">
                            {specifications.map((spec, idx) => (
                                <div key={idx} className="specs-row">
                                    <span className="specs-label">{spec.label}</span>
                                    <span className="specs-value">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
