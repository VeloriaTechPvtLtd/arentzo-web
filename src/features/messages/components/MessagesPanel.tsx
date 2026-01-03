import React, { useState, useEffect, useCallback } from 'react';
import { X, ArrowLeft, MessageSquare } from 'lucide-react';
import { ConversationList } from './ConversationList';
import { ChatView } from './ChatView';
import type { Conversation, MessagesView } from '../types';
import { mockConversations } from '../data/mockData';
import '../Messages.css';

interface MessagesPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MessagesPanel: React.FC<MessagesPanelProps> = ({ isOpen, onClose }) => {
    const [view, setView] = useState<MessagesView>('list');
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                if (view !== 'list') {
                    setView('list');
                } else {
                    onClose();
                }
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose, view]);

    // Lock body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Reset view when panel closes
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => {
                setView('list');
                setSelectedConversation(null);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleBackdropClick = useCallback((e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

    const handleSelectConversation = (conversation: Conversation) => {
        setSelectedConversation(conversation);
        setView('chat');
    };

    const handleBack = () => {
        setView('list');
        setSelectedConversation(null);
    };

    return (
        <div className={`messages-overlay ${isOpen ? 'messages-overlay--open' : ''}`}>
            <div className="messages-overlay__backdrop" onClick={handleBackdropClick} />

            <div className="messages-panel">
                <header className="messages-panel__header">
                    {view === 'chat' ? (
                        <button
                            className="messages-panel__back"
                            onClick={handleBack}
                            aria-label="Back to conversations"
                        >
                            <ArrowLeft size={20} />
                        </button>
                    ) : (
                        <div className="messages-panel__back" style={{ visibility: 'hidden' }}>
                            <ArrowLeft size={20} />
                        </div>
                    )}

                    <h2 className="messages-panel__title">
                        {view === 'chat' && selectedConversation
                            ? selectedConversation.participantName
                            : 'Messages'}
                    </h2>

                    <button
                        className="messages-panel__close"
                        onClick={onClose}
                        aria-label="Close Messages"
                    >
                        <X size={20} />
                    </button>
                </header>

                <div className="messages-panel__content">
                    {view === 'list' ? (
                        <ConversationList
                            conversations={mockConversations}
                            onSelectConversation={handleSelectConversation}
                        />
                    ) : (
                        selectedConversation && <ChatView conversation={selectedConversation} />
                    )}

                    {view === 'list' && mockConversations.length === 0 && (
                        <div className="messages-panel__empty">
                            <MessageSquare size={48} />
                            <p>No conversations yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
