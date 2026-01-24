
import React from 'react';
import { X, Check } from 'lucide-react';

export interface FilterDefinition {
    id: string;
    label: string;
    type: 'checkbox' | 'range' | 'date-range';
    options?: { id: string; label: string }[];
    minLabel?: string;
    maxLabel?: string;
}

interface ProviderFilterModalProps {
    isOpen: boolean;
    onClose: () => void;
    filters: any;
    onUpdate: (key: string, value: any) => void;
    onReset: () => void;
    definitions: FilterDefinition[];
}

export const ProviderFilterModal: React.FC<ProviderFilterModalProps> = ({
    isOpen,
    onClose,
    filters,
    onUpdate,
    onReset,
    definitions
}) => {
    if (!isOpen) return null;

    const renderFilter = (def: FilterDefinition) => {
        switch (def.type) {
            case 'checkbox':
                return (
                    <div className="space-y-3">
                        {def.options?.map((option) => {
                            const isSelected = (filters[def.id] || []).includes(option.id);
                            return (
                                <div
                                    key={option.id}
                                    onClick={() => {
                                        const current = filters[def.id] || [];
                                        const next = current.includes(option.id)
                                            ? current.filter((id: string) => id !== option.id)
                                            : [...current, option.id];
                                        onUpdate(def.id, next);
                                    }}
                                    className="flex items-center justify-between p-3 rounded-xl border border-border hover:bg-secondary/50 transition-colors cursor-pointer group bg-card"
                                >
                                    <span className="font-medium text-sm">{option.label}</span>
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all
                                        ${isSelected
                                            ? 'bg-primary border-primary text-primary-foreground'
                                            : 'border-muted-foreground/30 group-hover:border-primary'
                                        }`}
                                    >
                                        {isSelected && <Check className="w-3.5 h-3.5" />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );

            case 'range':
                const range = filters[def.id] || { min: null, max: null };
                return (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-muted-foreground uppercase">{def.minLabel || 'Min'}</label>
                            <input
                                type="number"
                                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                                placeholder="0"
                                value={range.min || ''}
                                onChange={(e) => onUpdate(def.id, { ...range, min: e.target.value ? Number(e.target.value) : null })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-muted-foreground uppercase">{def.maxLabel || 'Max'}</label>
                            <input
                                type="number"
                                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                                placeholder="Any"
                                value={range.max || ''}
                                onChange={(e) => onUpdate(def.id, { ...range, max: e.target.value ? Number(e.target.value) : null })}
                            />
                        </div>
                    </div>
                );

            case 'date-range':
                const dateRange = filters[def.id] || { from: null, to: null };
                return (
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-muted-foreground uppercase">From</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                                    value={dateRange.from ? new Date(dateRange.from).toISOString().split('T')[0] : ''}
                                    onChange={(e) => onUpdate(def.id, { ...dateRange, from: e.target.value ? new Date(e.target.value) : null })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-muted-foreground uppercase">To</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                                    value={dateRange.to ? new Date(dateRange.to).toISOString().split('T')[0] : ''}
                                    onChange={(e) => onUpdate(def.id, { ...dateRange, to: e.target.value ? new Date(e.target.value) : null })}
                                />
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 z-[60] flex flex-col bg-background/80 backdrop-blur-sm sm:items-center sm:justify-center animate-in fade-in duration-200">
            <div className="w-full h-full sm:h-[85vh] sm:w-[500px] bg-background sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-border">

                {/* Header */}
                <div className="px-6 py-4 border-b border-border flex items-center justify-between shrink-0 bg-background z-20">
                    <h2 className="text-lg font-bold">Filter</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-secondary transition-colors"
                    >
                        <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-secondary/5">
                    {definitions.map((def) => (
                        <div key={def.id} className="space-y-3">
                            <h3 className="text-sm font-semibold text-foreground">{def.label}</h3>
                            {renderFilter(def)}
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border bg-background flex gap-4 shrink-0">
                    <button
                        onClick={onReset}
                        className="flex-1 py-3 rounded-xl border border-border font-semibold hover:bg-secondary transition-colors text-sm"
                    >
                        Clear All
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg hover:bg-primary/90 transition-all active:scale-[0.98] text-sm"
                    >
                        Show Results
                    </button>
                </div>
            </div>
        </div>
    );
};
