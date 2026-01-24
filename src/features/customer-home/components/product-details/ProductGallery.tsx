import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Specification } from '../../types';

interface ProductGalleryProps {
    images: string[];
    name: string;
    isImported?: boolean;
    specifications?: Specification[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, name, isImported, specifications }) => {
    const [selectedImage, setSelectedImage] = React.useState(0);
    const [isOverlayOpen, setIsOverlayOpen] = React.useState(true);

    const nextImage = () => setSelectedImage((prev) => (prev + 1) % images.length);
    const prevImage = () => setSelectedImage((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className="product-gallery">
            <div className="main-image-container">
                <img src={images[selectedImage]} alt={name} className="main-image" />

                {isImported && (
                    <span className="badge badge--imported">IMPORTED</span>
                )}

                {/* Features Overlay */}
                {specifications && specifications.length > 0 && (
                    <div className={`features-overlay ${isOverlayOpen ? 'open' : 'collapsed'}`}>
                        <button
                            className="overlay-toggle"
                            onClick={() => setIsOverlayOpen(!isOverlayOpen)}
                        >
                            <h4 className="overlay-title">Key Features</h4>
                            <ChevronRight size={16} className="toggle-icon" />
                        </button>

                        <div className="overlay-content">
                            <div className="overlay-list">
                                {specifications.map((spec, idx) => (
                                    <div key={idx} className="overlay-item">
                                        <span className="overlay-label">{spec.label}</span>
                                        <span className="overlay-value">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Arrows */}
                <button className="gallery-nav gallery-nav--prev" onClick={prevImage}>
                    <ChevronLeft size={24} />
                </button>
                <button className="gallery-nav gallery-nav--next" onClick={nextImage}>
                    <ChevronRight size={24} />
                </button>

                {/* Carousel Dots */}
                <div className="carousel-dots">
                    {images.map((_, idx) => (
                        <span
                            key={idx}
                            className={`dot ${idx === selectedImage ? 'active' : ''}`}
                        />
                    ))}
                </div>
            </div>
            {images.length > 1 && (
                <div className="thumbnail-list">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            className={`thumbnail ${idx === selectedImage ? 'active' : ''}`}
                            onClick={() => setSelectedImage(idx)}
                        >
                            <img src={img} alt={`View ${idx + 1}`} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};
