import React from 'react';
import type { TopSelection } from '../../domain/entities/types';

interface TopSelectionsProps {
    title: string;
    selections: TopSelection[];
    onSelectionClick?: (selection: TopSelection) => void;
}

export const TopSelections: React.FC<TopSelectionsProps> = ({
    title,
    selections,
    onSelectionClick,
}) => {
    return (
        <section className="top-selections">
            <h2 className="top-selections__title">{title}</h2>

            <div className="top-selections__grid">
                {selections.map((selection, index) => (
                    <button
                        key={selection.id}
                        className="selection-card"
                        onClick={() => onSelectionClick?.(selection)}
                        style={{
                            '--card-delay': `${index * 0.05}s`,
                        } as React.CSSProperties}
                    >
                        <div className="selection-card__images">
                            {selection.images.slice(0, 4).map((image, imgIndex) => (
                                <div
                                    key={imgIndex}
                                    className="selection-card__image-wrapper"
                                >
                                    <img
                                        src={image}
                                        alt=""
                                        className="selection-card__image"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                            <span className="selection-card__count">
                                + {selection.itemCount} more
                            </span>
                        </div>
                        <span className="selection-card__name">{selection.name}</span>
                    </button>
                ))}
            </div>
        </section>
    );
};
