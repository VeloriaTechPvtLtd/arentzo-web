import React, { useRef, useState } from 'react';
import { User } from 'lucide-react';

interface ProfileUploadProps {
    onImageSelect?: (file: File) => void;
}

export const ProfileUpload: React.FC<ProfileUploadProps> = ({ onImageSelect }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            onImageSelect?.(file);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-3 mb-4">
            <div
                onClick={handleClick}
                className="w-24 h-24 bg-white border border-[#f2f2f2] rounded-2xl flex items-center justify-center cursor-pointer hover:bg-secondary/10 transition-all overflow-hidden shadow-sm"
            >
                {previewUrl ? (
                    <img src={previewUrl} alt="Profile Preview" className="w-full h-full object-cover" />
                ) : (
                    <User className="w-10 h-10 text-[#d1d5db]" />
                )}
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
            <button
                type="button"
                onClick={handleClick}
                className="text-primary font-bold text-sm tracking-wide hover:underline"
            >
                Upload Photo
            </button>
        </div>
    );
};
