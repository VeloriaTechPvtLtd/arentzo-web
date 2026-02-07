import React, { useEffect, useCallback } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import './Drawer.css';

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    onBack?: () => void;
    title?: string;
    children: React.ReactNode;
    width?: string;
    className?: string;
    showCloseButton?: boolean;
}

export const Drawer: React.FC<DrawerProps> = ({
    isOpen,
    onClose,
    onBack,
    title,
    children,
    width = '400px',
    className = '',
    showCloseButton = true
}) => {
    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    const handleBackdropClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    return (
        <div className={`ui-drawer-overlay ${isOpen ? 'ui-drawer-overlay--open' : ''} ${className}`}>
            <div className="ui-drawer-backdrop" onClick={handleBackdropClick} />
            <div
                className="ui-drawer-panel"
                style={{ width }}
            >
                {(title || onBack || showCloseButton) && (
                    <header className="ui-drawer-header">
                        <div className="flex items-center gap-3">
                            {onBack && (
                                <button
                                    onClick={onBack}
                                    className="p-1 -ml-1 hover:bg-muted rounded-full transition-colors"
                                    aria-label="Go back"
                                >
                                    <ArrowLeft size={20} />
                                </button>
                            )}
                            {title && <h2 className="ui-drawer-title">{title}</h2>}
                        </div>
                        {showCloseButton && (
                            <button
                                className="ui-drawer-close"
                                onClick={onClose}
                                aria-label="Close"
                            >
                                <X size={20} />
                            </button>
                        )}
                    </header>
                )}
                <div className="ui-drawer-content">
                    {children}
                </div>
            </div>
        </div>
    );
};
