import React from 'react';
import { Star, Check } from 'lucide-react';

interface RatingsFilterProps {
    minRating: number | null;
    onChange: (rating: number | null) => void;
}

const RATINGS = [4, 3, 2, 1];

export const RatingsFilter: React.FC<RatingsFilterProps> = ({ minRating, onChange }) => {
    return (
        <div className="space-y-4">
            {RATINGS.map((stars) => {
                const isSelected = minRating === stars;
                return (
                    <div
                        key={stars}
                        onClick={() => onChange(isSelected ? null : stars)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white transition-colors cursor-pointer group"
                    >
                        <div className="flex items-center gap-2">
                            <div className="flex">
                                <Star className="w-5 h-5 fill-black text-black" />
                            </div>
                            <span className="font-medium">{stars}★ & above</span>
                        </div>

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
    );
};
