import React from 'react';
import { X, Tag, Percent } from 'lucide-react';

interface AddOfferFormProps {
    onClose: () => void;
    onSuccess: () => void;
}

export const AddOfferForm: React.FC<AddOfferFormProps> = ({ onClose, onSuccess }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSuccess();
    };

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-background w-full max-w-lg rounded-[32px] shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-300">
                <div className="px-8 py-6 border-bottom border-border flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                            <Tag size={24} />
                        </div>
                        <h2 className="text-xl font-800 text-foreground">Create New Offer</h2>
                    </div>
                    <button onClick={onClose} className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground hover:text-primary transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <form className="p-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground">Offer Title</label>
                            <input
                                type="text"
                                placeholder="e.g. Festival Special"
                                className="w-full p-4 bg-card border border-border rounded-xl focus:border-primary focus:outline-none transition-colors"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground">Discount Type</label>
                                <div className="relative">
                                    <select className="w-full p-4 bg-card border border-border rounded-xl focus:border-primary focus:outline-none transition-colors appearance-none">
                                        <option>Percentage (%)</option>
                                        <option>Fixed Amount (₹)</option>
                                    </select>
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                                        <Percent size={18} />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground">Value</label>
                                <input
                                    type="number"
                                    placeholder="10"
                                    className="w-full p-4 bg-card border border-border rounded-xl focus:border-primary focus:outline-none transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground">Applicable Products</label>
                            <select className="w-full p-4 bg-card border border-border rounded-xl focus:border-primary focus:outline-none transition-colors appearance-none" multiple>
                                <option>All Products</option>
                                <option>DSLR Camera</option>
                                <option>Camping Tent</option>
                            </select>
                            <p className="text-[11px] text-muted-foreground">Hold Ctrl/Cmd to select multiple products</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground">Start Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        className="w-full p-4 bg-card border border-border rounded-xl focus:border-primary focus:outline-none transition-colors"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground">End Date</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        className="w-full p-4 bg-card border border-border rounded-xl focus:border-primary focus:outline-none transition-colors"
                                        required
                                    />
                                </div>
                            </div>
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
                            Create Offer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
