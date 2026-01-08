import React, { useState } from 'react';
import { X, Upload, Plus, Trash2 } from 'lucide-react';

interface AddProductFormProps {
    onClose: () => void;
    onSuccess: () => void;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({ onClose, onSuccess }) => {
    const [images, setImages] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock success
        onSuccess();
    };

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-background w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[32px] shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md px-8 py-6 border-bottom border-border flex justify-between items-center">
                    <h2 className="text-2xl font-800 text-foreground">Add New Product</h2>
                    <button onClick={onClose} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:text-primary transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form className="p-8 space-y-8" onSubmit={handleSubmit}>
                    {/* Image Upload Area */}
                    <div className="space-y-4">
                        <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Product Images</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {images.map((img, idx) => (
                                <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group">
                                    <img src={img} alt="Product" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => setImages(images.filter((_, i) => i !== idx))}
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                            {images.length < 4 && (
                                <button
                                    type="button"
                                    className="aspect-square rounded-2xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center gap-2 text-primary hover:bg-primary/5 transition-colors"
                                    onClick={() => setImages([...images, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'])}
                                >
                                    <Upload size={24} />
                                    <span className="text-xs font-bold">Upload</span>
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground">Product Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Professional Camera"
                                className="w-full p-4 bg-card border border-border rounded-xl focus:border-primary focus:outline-none transition-colors"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground">Category</label>
                            <select className="w-full p-4 bg-card border border-border rounded-xl focus:border-primary focus:outline-none transition-colors appearance-none">
                                <option>Electronics</option>
                                <option>Outdoors</option>
                                <option>Home Appliaces</option>
                                <option>Fashion</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground">Daily Price (₹)</label>
                            <input
                                type="number"
                                placeholder="0.00"
                                className="w-full p-4 bg-card border border-border rounded-xl focus:border-primary focus:outline-none transition-colors"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground">Monthly Price (₹)</label>
                            <input
                                type="number"
                                placeholder="0.00"
                                className="w-full p-4 bg-card border border-border rounded-xl focus:border-primary focus:outline-none transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-foreground">Description</label>
                        <textarea
                            rows={4}
                            placeholder="Describe your product..."
                            className="w-full p-4 bg-card border border-border rounded-xl focus:border-primary focus:outline-none transition-colors resize-none"
                        />
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-bold text-foreground">Features / Specs</label>
                            <button type="button" className="text-primary text-sm font-bold flex items-center gap-1">
                                <Plus size={16} /> Add More
                            </button>
                        </div>
                        <div className="space-y-3">
                            <input type="text" placeholder="e.g. 4K Video support" className="w-full p-3 bg-secondary/50 border-none rounded-lg text-sm" />
                            <input type="text" placeholder="e.g. Lightweight and portable" className="w-full p-3 bg-secondary/50 border-none rounded-lg text-sm" />
                        </div>
                    </div>

                    <div className="pt-4 flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 p-4 rounded-xl font-bold border border-border hover:bg-secondary transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 p-4 rounded-xl font-bold bg-primary text-white hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
                        >
                            List Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
