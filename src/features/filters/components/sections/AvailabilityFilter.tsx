import React from 'react';
import { Check, Calendar } from 'lucide-react';

interface AvailabilityFilterProps {
    period: string | null;
    dateRange: { from: Date | null; to: Date | null };
    onChangePeriod: (period: string | null) => void;
    onChangeDateRange: (range: { from: Date | null; to: Date | null }) => void;
}

const PERIODS = [
    'Available Now',
    'Available Today',
    'Available this Week',
    'Available this Month'
];

export const AvailabilityFilter: React.FC<AvailabilityFilterProps> = ({ period, dateRange, onChangePeriod, onChangeDateRange }) => {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                {PERIODS.map((p) => {
                    const isSelected = period === p;
                    return (
                        <div
                            key={p}
                            onClick={() => onChangePeriod(isSelected ? null : p)}
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-white transition-colors cursor-pointer group"
                        >
                            <span className="font-medium">{p}</span>
                            <div className={`w-6 h-6 rounded border flex items-center justify-center transition-all
                                ${isSelected
                                    ? 'bg-primary border-primary text-primary-foreground'
                                    : 'border-gray-300 group-hover:border-primary'
                                }`}
                            >
                                {isSelected && <Check className="w-4 h-4" />}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="pt-4 border-t border-border space-y-4">
                <span className="font-medium text-muted-foreground block">Select Date Range:</span>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">From</label>
                        <div className="relative">
                            <input
                                type="date"
                                className="w-full px-4 py-3 rounded-xl border border-border bg-white outline-none focus:ring-2 focus:ring-primary/20"
                                value={dateRange.from ? dateRange.from.toISOString().split('T')[0] : ''}
                                onChange={(e) => onChangeDateRange({ ...dateRange, from: e.target.value ? new Date(e.target.value) : null })}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase">To</label>
                        <div className="relative">
                            <input
                                type="date"
                                className="w-full px-4 py-3 rounded-xl border border-border bg-white outline-none focus:ring-2 focus:ring-primary/20"
                                value={dateRange.to ? dateRange.to.toISOString().split('T')[0] : ''}
                                onChange={(e) => onChangeDateRange({ ...dateRange, to: e.target.value ? new Date(e.target.value) : null })}
                            />
                        </div>
                    </div>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                    "Only items available for your selected dates will be shown."
                </p>
            </div>
        </div>
    );
};
