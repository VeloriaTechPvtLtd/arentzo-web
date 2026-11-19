import React, { useState, useEffect, useCallback } from 'react';
import { X, ArrowLeft, MessageSquare } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/ui/context/AuthContext';
import { ConversationList } from './ConversationList';
import { ChatView } from './ChatView';
import type { Conversation, MessagesView } from '../../domain/entities/types';
import { ChatService } from '../../application/services/ChatService';
import { SupabaseChatRepository } from '../../infrastructure/SupabaseChatRepository';
import '../styles/Messages.css';

interface MessagesPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const MessagesPanel: React.FC<MessagesPanelProps> = ({ isOpen, onClose }) => {
    const router = useRouter();
    const { user } = useAuth();
    const service = React.useMemo(() => new ChatService(new SupabaseChatRepository()), []);
    const [view, setView] = useState<MessagesView>('list');
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [messages, setMessages] = useState<Conversation['messages']>([]);
    const [loading, setLoading] = useState(true);
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');
    const [messagesError, setMessagesError] = useState('');

    useEffect(() => {
        let active = true;
        if (!isOpen) return () => { active = false; };
        if (!user) {
            setConversations([]);
            setLoading(false);
            return () => { active = false; };
        }
        void service.listConversations(user.id).then((rows) => {
            if (active) {
                setConversations(rows);
                setError('');
            }
        }).catch(() => {
            if (active) setError('Conversations could not be loaded. Please try again.');
        }).finally(() => {
            if (active) setLoading(false);
        });
        return () => { active = false; };
    }, [isOpen, user, service]);

    useEffect(() => {
        let active = true;
        if (!isOpen || view !== 'chat' || !selectedConversation) return () => { active = false; };
        setMessagesLoading(true);
        setMessagesError('');
        void service.listMessages(selectedConversation.id).then((rows) => {
            if (active) setMessages(rows);
        }).catch(() => {
            if (active) setMessagesError('Messages could not be loaded. Please try again.');
        }).finally(() => {
            if (active) setMessagesLoading(false);
        });
        return () => { active = false; };
    }, [isOpen, view, selectedConversation, service]);

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
                setMessages([]);
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
        setMessages([]);
        setView('chat');
    };

    const handleBack = () => {
        setView('list');
        setSelectedConversation(null);
        setMessages([]);
    };

    const handleSend = async (message: string) => {
        if (!user || !selectedConversation) throw new Error('Sign in to send a message.');
        if (!selectedConversation.isActive || selectedConversation.blockedBy) throw new Error('Messaging is unavailable.');
        setSending(true);
        try {
            const sent = await service.send(user.id, selectedConversation.id, message);
            setMessages((current) => [...current, sent]);
        } finally {
            setSending(false);
        }
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
                        !user ? <div className="messages-panel__empty"><MessageSquare size={40} /><p>Sign in to view messages.</p><button type="button" className="settings-save-btn" onClick={() => { onClose(); router.push('/login?next=%2F'); }}>Sign in</button></div> : (
                            <>
                                {loading ? <p role="status" className="p-5">Loading conversations…</p> : null}
                                {error ? <p role="alert" className="p-5">{error}</p> : null}
                                {!loading && !error && conversations.length > 0 ? <ConversationList conversations={conversations} onSelectConversation={handleSelectConversation} /> : null}
                                {!loading && !error && conversations.length === 0 ? <div className="messages-panel__empty"><MessageSquare size={48} /><p>No conversations yet</p></div> : null}
                            </>
                        )
                    ) : (
                        selectedConversation && user ? <ChatView conversation={selectedConversation} messages={messages} currentUserId={user.id} loading={messagesLoading} sending={sending} error={messagesError} onSend={handleSend} /> : null
                    )}
                </div>
            </div>
        </div>
    );
};
