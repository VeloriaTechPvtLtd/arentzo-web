import React from 'react';
import { Check } from 'lucide-react';

interface Option {
    id: string;
    label: string;
}

interface GenericCheckboxFilterProps {
    options: Option[];
    selected: string[];
    onChange: (selected: string[]) => void;
}

export const GenericCheckboxFilter: React.FC<GenericCheckboxFilterProps> = ({ options, selected, onChange }) => {
    const toggleOption = (id: string) => {
        if (selected.includes(id)) {
            onChange(selected.filter(s => s !== id));
        } else {
            onChange([...selected, id]);
        }
    };

    return (
        <div className="space-y-4">
            {options.map((option) => {
                const isSelected = selected.includes(option.id);
                return (
                    <div
                        key={option.id}
                        onClick={() => toggleOption(option.id)}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-white transition-colors cursor-pointer group"
                    >
                        <span className="font-medium">{option.label}</span>
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
