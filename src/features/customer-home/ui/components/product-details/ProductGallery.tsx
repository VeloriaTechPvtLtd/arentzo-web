import { useTranslation } from 'react-i18next';
import React from 'react';
import { ChevronLeft, ChevronRight, ImageOff } from 'lucide-react';
import type { Specification } from '../../../domain/entities/types';

interface ProductGalleryProps {
    images: string[];
    name: string;
    isImported?: boolean;
    specifications?: Specification[];
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, name, isImported }) => {
    const { t } = useTranslation();
    const [failedImage, setFailedImage] = React.useState<string | null>(null);
    const [selectedImage, setSelectedImage] = React.useState(0);

    const activeImage = images.length ? selectedImage % images.length : 0;

    const nextImage = () => setSelectedImage((prev) => (prev + 1) % images.length);
    const prevImage = () => setSelectedImage((prev) => (prev - 1 + images.length) % images.length);

    return (
        <div className="product-gallery">
            <div className="main-image-container">
                {images[activeImage] && images[activeImage] !== '/placeholder.svg' && failedImage !== images[activeImage]
                    ? <img src={images[activeImage]} alt={name} className="main-image" onError={() => setFailedImage(images[activeImage])} />
                    : <div className="h-full flex flex-col items-center justify-center gap-3 text-muted-foreground"><ImageOff size={36} aria-hidden="true" /><span>{t('mobileRental.photoMissing')}</span></div>}

                {isImported && (
                    <span className="badge badge--imported">IMPORTED</span>
                )}

                {/* Navigation Arrows */}
                {images.length > 1 && <><button aria-label={t('mobileRental.previousPhoto')} className="gallery-nav gallery-nav--prev" onClick={prevImage}>
                    <ChevronLeft size={24} />
                </button>
                <button aria-label={t('mobileRental.nextPhoto')} className="gallery-nav gallery-nav--next" onClick={nextImage}>
                    <ChevronRight size={24} />
                </button>

                </>}
                {/* Carousel Dots */}
                <div className="carousel-dots">
                    {images.map((_, idx) => (
                        <span
                            key={idx}
                            className={`dot ${idx === activeImage ? 'active' : ''}`}
                        />
                    ))}
                </div>
            </div>
            {images.length > 1 && (
                <div className="thumbnail-list">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            aria-label={`Show photo ${idx + 1} of ${images.length}`}
                            aria-pressed={idx === activeImage}
                            className={`thumbnail ${idx === activeImage ? 'active' : ''}`}
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
