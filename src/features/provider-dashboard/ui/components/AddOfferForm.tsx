import React, { useState, useEffect } from 'react';
import { X, ArrowLeft, Upload, ChevronRight, Search } from 'lucide-react';
import { mockProducts } from '../../infrastructure/api/productsMockData';
import { type Offer } from '../../infrastructure/api/offersMockData';
import '../styles/ProviderDrawer.css';

interface AddOfferFormProps {
    onClose: () => void;
    onSuccess: (offer: Offer) => void;
    initialData?: Offer;
}

type ViewMode = 'form' | 'product-selection';

export const AddOfferForm: React.FC<AddOfferFormProps> = ({ onClose, onSuccess, initialData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [viewMode, setViewMode] = useState<ViewMode>('form');
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        terms: initialData?.termsAndConditions || '',
        spendingLimit: initialData?.spendingLimit || '',
        usageLimit: initialData?.usageLimitPerUser || '',
        validUntil: initialData?.endDate ? new Date(initialData.endDate).toISOString().split('T')[0] : '',
        discountPercentage: initialData?.discountValue || '',
        code: initialData?.code || '',
        selectedProductIds: initialData?.applicableProductIds || [] as string[],
    });

    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        const timer = setTimeout(() => setIsOpen(true), 10);

        return () => {
            document.body.style.overflow = originalStyle;
            clearTimeout(timer);
        };
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        setTimeout(onClose, 300);
    };

    const handleFormChange = (field: string, value: string | number | string[]) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleGenerateCode = () => {
        const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        handleFormChange('code', randomCode);
    };

    const handleSubmit = () => {
        const offer: Offer = {
            id: initialData?.id || `OFF-${Math.floor(Math.random() * 10000)}`,
            title: formData.title,
            code: formData.code,
            discountType: 'percentage',
            discountValue: Number(formData.discountPercentage),
            status: 'active',
            usageCount: 0,
            startDate: new Date().toISOString(),
            endDate: new Date(formData.validUntil).toISOString(),
            applicableProductIds: formData.selectedProductIds,
            revenueGenerated: 0,
            totalSales: 0,
            termsAndConditions: formData.terms,
            spendingLimit: Number(formData.spendingLimit),
            usageLimitPerUser: Number(formData.usageLimit),
        };
        onSuccess(offer);
    };

    if (viewMode === 'product-selection') {
        return (
            <ProductSelectionView
                selectedIds={formData.selectedProductIds}
                onBack={() => setViewMode('form')}
                onUpdate={(ids) => handleFormChange('selectedProductIds', ids)}
            />
        );
    }

    return (
        <div className={`provider-drawer-overlay ${isOpen ? 'provider-drawer-overlay--open' : ''}`}>
            <div className="provider-drawer-overlay__backdrop" onClick={handleClose} />

            <div className="provider-drawer-panel">
                <header className="provider-drawer-panel__header">
                    <button
                        className="provider-drawer-panel__back"
                        onClick={handleClose}
                        aria-label="Close"
                    >
                        <X size={20} />
                    </button>
                    <h2 className="provider-drawer-panel__title">
                        {initialData ? 'Edit Coupon' : 'Create Coupon'}
                    </h2>
                    <div style={{ width: 36 }} />
                </header>

                <div className="provider-drawer-panel__content">
                    <div className="px-6 py-6 space-y-8">
                        <div className="space-y-1">
                            <h2 className="text-lg font-bold text-foreground">Coupon Details</h2>
                            <p className="text-xs text-muted-foreground">Basic information about your coupon</p>
                        </div>

                        <div className="space-y-6">
                            <FormInput
                                label="Coupon Title"
                                placeholder="eg. Get 10% OFF upto ₹300"
                                value={formData.title}
                                onChange={(v: string) => handleFormChange('title', v)}
                            />

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-foreground">Terms & Condition</label>
                                <textarea
                                    className="w-full p-4 bg-muted/30 border border-border rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all min-h-[120px] text-sm resize-none"
                                    placeholder="eg. Applicable only on transactions using select Axis Bank Credit Cards"
                                    value={formData.terms}
                                    onChange={(e) => handleFormChange('terms', e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <FormInput
                                    label="Spending Limit"
                                    placeholder="Set minimum cart value to avail this offer"
                                    value={formData.spendingLimit}
                                    onChange={(v: string) => handleFormChange('spendingLimit', v)}
                                    type="number"
                                />
                                <FormInput
                                    label="Usage Limit Per User"
                                    placeholder="Enter usage limit per user number"
                                    value={formData.usageLimit}
                                    onChange={(v: string) => handleFormChange('usageLimit', v)}
                                    type="number"
                                />
                                <FormInput
                                    label="Valid Until"
                                    placeholder="DD/MM/YYYY"
                                    value={formData.validUntil}
                                    onChange={(v: string) => handleFormChange('validUntil', v)}
                                    type="date"
                                />
                                <FormInput
                                    label="Discount Percentage"
                                    placeholder="Enter Discount Percentage"
                                    value={formData.discountPercentage}
                                    onChange={(v: string) => handleFormChange('discountPercentage', v)}
                                    type="number"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <h2 className="text-lg font-bold text-foreground">Applicable Products</h2>
                                    <p className="text-xs text-muted-foreground">Select which products are eligible for this coupon</p>
                                </div>

                                {formData.selectedProductIds.length > 0 && (
                                    <div className="space-y-3">
                                        {mockProducts.filter(p => formData.selectedProductIds.includes(p.id)).map(product => (
                                            <SelectedProductCard
                                                key={product.id}
                                                product={product}
                                                onRemove={(id: string) => handleFormChange('selectedProductIds', formData.selectedProductIds.filter(sid => sid !== id))}
                                            />
                                        ))}
                                    </div>
                                )}

                                <button
                                    onClick={() => setViewMode('product-selection')}
                                    className="w-full p-4 border border-primary/20 bg-primary/5 text-primary rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/10 transition-colors"
                                >
                                    {formData.selectedProductIds.length > 0 ? 'Add more Products' : 'Select Products'}
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <h2 className="text-lg font-bold text-foreground">Coupon Image</h2>
                                    <p className="text-xs text-muted-foreground">Add an image to represent this coupon</p>
                                </div>
                                <div className="border-2 border-dashed border-primary/20 bg-primary/5 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-primary/10 transition-colors">
                                    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                                        <Upload className="w-6 h-6 text-muted-foreground" />
                                    </div>
                                    <div className="text-center">
                                        <p className="font-bold text-primary">Click to upload</p>
                                        <p className="text-xs text-muted-foreground uppercase">PNG, JPG up to 10MB</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-lg font-bold text-foreground">Coupon Code</h2>
                                <div className="flex gap-4">
                                    <input
                                        className="flex-1 p-4 bg-muted/30 border border-border rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-sm"
                                        placeholder="Enter Coupon Code"
                                        value={formData.code}
                                        onChange={(e) => handleFormChange('code', e.target.value.toUpperCase())}
                                    />
                                    <button
                                        onClick={handleGenerateCode}
                                        className="px-6 py-4 bg-primary/80 hover:bg-primary text-white rounded-xl font-bold transition-all shadow-md shadow-primary/20"
                                    >
                                        Generate
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="provider-drawer-panel__footer">
                    <button
                        onClick={handleSubmit}
                        className="provider-drawer-panel__footer-btn"
                    >
                        {initialData ? 'Update' : 'Save'}
                    </button>
                </footer>
            </div>
        </div>
    );
};

interface FormInputProps { label: string; placeholder: string; value: string | number; onChange: (value: string) => void; type?: string }
const FormInput = ({ label, placeholder, value, onChange, type = 'text' }: FormInputProps) => (
    <div className="space-y-2">
        <label className="text-sm font-bold text-foreground">{label}</label>
        <input
            type={type}
            className="w-full p-4 bg-muted/30 border border-border rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-sm"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

const SelectedProductCard = ({ product, onRemove }: { product: (typeof mockProducts)[number]; onRemove: (id: string) => void }) => (
    <div className="flex items-center gap-4 p-3 bg-red-50/50 border border-red-100 rounded-2xl relative">
        <img src={product.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
        <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-foreground truncate">{product.name}</h3>
            <p className="text-xs text-muted-foreground bg-white/50 inline-block px-2 py-0.5 rounded-full mt-1 border border-black/5">
                {product.category}
            </p>
        </div>
        <button
            onClick={() => onRemove(product.id)}
            className="p-1 text-white bg-red-500 rounded-full shadow-lg hover:bg-red-600 transition-colors"
        >
            <X size={16} />
        </button>
    </div>
);

const ProductSelectionView = ({ selectedIds, onBack, onUpdate }: { selectedIds: string[], onBack: () => void, onUpdate: (ids: string[]) => void }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentSelection, setCurrentSelection] = useState(selectedIds);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setIsOpen(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const handleBack = () => {
        setIsOpen(false);
        setTimeout(onBack, 300);
    };

    const toggleProduct = (id: string) => {
        setCurrentSelection(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const filteredProducts = mockProducts.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={`provider-drawer-overlay ${isOpen ? 'provider-drawer-overlay--open' : ''}`} style={{ zIndex: 2100 }}>
            <div className="provider-drawer-overlay__backdrop" onClick={handleBack} />

            <div className="provider-drawer-panel">
                <header className="provider-drawer-panel__header">
                    <button
                        className="provider-drawer-panel__back"
                        onClick={handleBack}
                        aria-label="Back"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className="provider-drawer-panel__title">Applicable Products</h2>
                    <div style={{ width: 36 }} />
                </header>

                <div className="provider-drawer-panel__content">
                    <div className="px-6 py-6 space-y-6">
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Select which products are eligible for this coupon</p>
                        </div>

                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input
                                className="w-full pl-12 pr-4 py-4 bg-muted/30 border border-border rounded-xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all text-sm"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="space-y-4">
                            {filteredProducts.map(product => {
                                const isSelected = currentSelection.includes(product.id);
                                return (
                                    <div
                                        key={product.id}
                                        onClick={() => toggleProduct(product.id)}
                                        className={`flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer ${isSelected ? 'bg-red-50 border-red-200' : 'bg-white border-border'
                                            }`}
                                    >
                                        <img src={product.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-bold text-foreground truncate">{product.name}</h3>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {product.category}
                                            </p>
                                        </div>
                                        {isSelected && (
                                            <div className="p-1 text-white bg-red-500 rounded-full">
                                                <X size={16} />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <footer className="provider-drawer-panel__footer">
                    <button
                        onClick={() => {
                            onUpdate(currentSelection);
                            handleBack();
                        }}
                        className="provider-drawer-panel__footer-btn"
                    >
                        Done
                    </button>
                </footer>
            </div>
        </div>
    );
};
