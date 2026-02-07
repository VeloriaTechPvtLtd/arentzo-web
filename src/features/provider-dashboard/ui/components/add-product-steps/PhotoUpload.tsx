import React, { useState } from 'react';
import { Camera, Plus, Info } from 'lucide-react';

interface PhotoUploadProps {
    onNext: () => void;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({ onNext }) => {
    const [images, setImages] = useState<string[]>([
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&q=80',
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&q=80',
        'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&q=80',
    ]);

    const handleAddPhoto = () => {
        // Mock add
        setImages([...images, 'https://images.unsplash.com/photo-1506469717960-433cebe3f181?w=500&q=80']);
    };

    return (
        <div className="step-content">
            <div className="photo-upload-container">
                <div className="photo-grid-layout">
                    {/* Main Photo Slot */}
                    <div className="main-photo-slot" onClick={handleAddPhoto}>
                        {images[0] ? (
                            <img src={images[0]} alt="Main" />
                        ) : (
                            <div className="camera-placeholder">
                                <div className="placeholder-icon">
                                    <Camera size={24} />
                                </div>
                                <span className="placeholder-label">Add Main Photo</span>
                            </div>
                        )}
                    </div>

                    {/* Secondary Slots (Column) */}
                    <div className="side-photos-col" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[1, 2].map((idx) => (
                            <div key={idx} className="secondary-photo-slot" onClick={handleAddPhoto}>
                                {images[idx] ? (
                                    <img src={images[idx]} alt={`Side ${idx}`} />
                                ) : (
                                    <Plus size={24} className="text-muted-foreground" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <p className="add-more-hint">Tap any slot to add or change photos</p>

                <div className="upload-instructions">
                    <Info size={24} className="info-icon" />
                    <div className="instruction-text">
                        <h4>Photo Guidelines</h4>
                        <p>Use high-quality landscape photos. First photo will be your cover image.</p>
                    </div>
                </div>
            </div>

            <div className="step-footer">
                <button className="next-btn" onClick={onNext}>Next</button>
            </div>
        </div>
    );
};
