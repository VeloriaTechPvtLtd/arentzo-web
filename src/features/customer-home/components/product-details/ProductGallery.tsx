import React from 'react';

interface ProductGalleryProps {
    images: string[];
    name: string;
    isImported?: boolean;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, name, isImported }) => {
    const [selectedImage, setSelectedImage] = React.useState(0);

    return (
        <div className="product-gallery">
            <div className="main-image-container">
                <img src={images[selectedImage]} alt={name} className="main-image" />
                {isImported && (
                    <span className="badge badge--imported">Imported</span>
                )}
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
