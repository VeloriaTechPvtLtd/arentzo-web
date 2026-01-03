import React from 'react';
import { Check } from 'lucide-react';
import carImage from '../../../../assets/uploaded_image_2_1767436507070.png'; // Placeholder image, ideally dynamic

interface TypeFilterProps {
    selected: string[];
    onChange: (selected: string[]) => void;
}

// Mock data for types based on the screenshot
const TYPES = [
    { id: 'compact_suv', label: 'Compact SUV', count: 11, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=100&h=100' },
    { id: 'mid_size_suv', label: 'Mid-Size SUV', count: 13, image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=100&h=100' },
    { id: 'luxury_suv', label: 'Luxury SUV', count: 22, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=100&h=100' },
    { id: 'off_road_suv', label: 'Off-Road SUV', count: 19, image: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?auto=format&fit=crop&q=80&w=100&h=100' },
    { id: 'compact_suv_2', label: 'Compact SUV', count: 20, image: 'https://images.unsplash.com/photo-1580273916550-e323be2eb5fa?auto=format&fit=crop&q=80&w=100&h=100' },
];

export const TypeFilter: React.FC<TypeFilterProps> = ({ selected, onChange }) => {
    const toggleType = (id: string) => {
        if (selected.includes(id)) {
            onChange(selected.filter(s => s !== id));
        } else {
            onChange([...selected, id]);
        }
    };

    return (
        <div className="space-y-4">
            {TYPES.map((type) => {
                const isSelected = selected.includes(type.id);
                return (
                    <div
                        key={type.id}
                        onClick={() => toggleType(type.id)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-white transition-colors cursor-pointer group"
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={type.image}
                                alt={type.label}
                                className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                            />
                            <div>
                                <h4 className="font-semibold text-foreground">{type.label}</h4>
                                <span className="text-sm text-muted-foreground">({type.count})</span>
                            </div>
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
