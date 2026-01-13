import React, { useRef, useState } from 'react';
import { User, Camera, X } from 'lucide-react';

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

    const removeImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div className="flex flex-col items-center space-y-4 mb-2">
            <div
                onClick={handleClick}
                className="group relative w-28 h-28 bg-card border-2 border-dashed border-border rounded-[2rem] flex items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300 overflow-hidden shadow-sm"
            >
                {previewUrl ? (
                    <>
                        <img src={previewUrl} alt="Profile Preview" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Camera className="w-8 h-8 text-white" />
                        </div>
                        <button
                            onClick={removeImage}
                            className="absolute top-2 right-2 p-1.5 bg-background/80 backdrop-blur-md rounded-full text-foreground/70 hover:text-destructive transition-colors shadow-lg shadow-black/5"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col items-center space-y-2">
                        <div className="p-3 bg-muted rounded-2xl group-hover:bg-primary/10 transition-colors">
                            <User className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                    </div>
                )}
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />
            <div className="text-center">
                <p className="text-sm font-bold text-foreground">Profile Picture</p>
                <p className="text-[11px] font-medium text-muted-foreground mt-0.5 uppercase tracking-wider">Tap to upload</p>
            </div>
        </div>
    );
};
