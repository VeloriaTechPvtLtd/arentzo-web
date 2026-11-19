'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import type { Conversation, Message } from '../../domain/entities/types';
import { MessageBubble } from './MessageBubble';

interface ChatViewProps {
    conversation: Conversation;
    messages: Message[];
    currentUserId: string;
    loading: boolean;
    sending: boolean;
    error: string;
    onSend: (message: string) => Promise<void>;
}

export const ChatView: React.FC<ChatViewProps> = ({ conversation, messages, currentUserId, loading, sending, error, onSend }) => {
    const [inputText, setInputText] = useState('');
    const [sendError, setSendError] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const content = inputText.trim();
        if (!content) return;
        setSendError('');
        try {
            await onSend(content);
            setInputText('');
        } catch {
            setSendError('Message could not be sent. Please try again.');
        }
    };

    const canSend = conversation.isActive && !conversation.blockedBy && !sending;

    return (
        <div className="chat-view">
            <div className="chat-view__messages" aria-live="polite">
                {loading ? <p role="status">Loading messages…</p> : null}
                {error ? <p role="alert">{error}</p> : null}
                {!loading && !error && messages.length === 0 ? <p className="text-center text-sm text-muted-foreground">No messages in this conversation.</p> : null}
                {!loading && messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} isOwn={msg.senderId === currentUserId} />
                ))}
                <div ref={messagesEndRef} />
            </div>

            {!conversation.isActive || conversation.blockedBy ? (
                <p role="status" className="p-4 text-center text-sm text-muted-foreground">Messaging is unavailable for this conversation.</p>
            ) : (
                <form className="chat-view__input-area" onSubmit={(event) => void handleSend(event)}>
                    {sendError ? <p role="alert" className="chat-view__error">{sendError}</p> : null}
                    <div className="chat-view__input-wrapper">
                        <input
                            type="text"
                            className="chat-view__input"
                            aria-label="Message"
                            placeholder="Type a message…"
                            value={inputText}
                            onChange={(event) => setInputText(event.target.value)}
                            maxLength={4000}
                            disabled={!canSend}
                        />
                    </div>
                    <button type="submit" className="chat-view__send-btn" disabled={!inputText.trim() || !canSend} aria-label="Send message">
                        <Send size={20} />
                    </button>
                </form>
            )}
        </div>
    );
};
