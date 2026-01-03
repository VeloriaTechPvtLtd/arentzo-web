import React from 'react';
import { LogOut } from 'lucide-react';

interface LogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="logout-modal-overlay">
            <div className="logout-modal" onClick={(e) => e.stopPropagation()}>
                <div className="logout-modal__icon">
                    <div className="logout-modal__icon-inner">
                        <LogOut size={32} />
                    </div>
                </div>

                <h3 className="logout-modal__title">Confirm Logout</h3>
                <p className="logout-modal__message">Are you sure want to log out?</p>

                <div className="logout-modal__actions">
                    <button className="logout-modal__btn logout-modal__btn--cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="logout-modal__btn logout-modal__btn--confirm" onClick={onConfirm}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};
