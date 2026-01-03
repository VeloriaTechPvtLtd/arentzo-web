import React from 'react';
import { Check } from 'lucide-react';

interface RadiusFilterProps {
    radius: number;
    customRadius: boolean;
    onChangeRadius: (radius: number) => void;
    onToggleCustom: (enabled: boolean) => void;
}

const PRESET_RADII = [3, 5, 10, 20];

export const RadiusFilter: React.FC<RadiusFilterProps> = ({ radius, customRadius, onChangeRadius, onToggleCustom }) => {
    return (
        <div className="space-y-8">
            <div className="space-y-4">
                {PRESET_RADII.map((kms) => {
                    const isSelected = !customRadius && radius === kms;
                    return (
                        <div
                            key={kms}
                            onClick={() => {
                                onToggleCustom(false);
                                onChangeRadius(kms);
                            }}
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-white transition-colors cursor-pointer group"
                        >
                            <span className="font-medium">{kms}Km</span>
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

            <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-8">
                    <span className="font-medium text-muted-foreground">Custom Radius:</span>
                    <div className={`w-6 h-6 rounded border flex items-center justify-center transition-all cursor-pointer
                        ${customRadius
                            ? 'bg-primary border-primary text-primary-foreground'
                            : 'border-gray-300'
                        }`}
                        onClick={() => onToggleCustom(!customRadius)}
                    >
                        {customRadius && <Check className="w-4 h-4" />}
                    </div>
                </div>

                <div className={`relative pt-6 pb-2 transition-opacity ${customRadius ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={radius}
                        onChange={(e) => onChangeRadius(Number(e.target.value))}
                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <div
                        className="absolute -top-2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full transform -translate-x-1/2"
                        style={{ left: `${((radius - 1) / 99) * 100}%` }}
                    >
                        {radius}Km
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rotate-45" />
                    </div>
                </div>
            </div>
        </div>
    );
};
