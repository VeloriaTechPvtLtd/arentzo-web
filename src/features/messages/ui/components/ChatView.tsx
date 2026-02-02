import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';
import type { Conversation, Message } from '../../domain/entities/types';
import { MessageBubble } from './MessageBubble';

interface ChatViewProps {
    conversation: Conversation;
}

export const ChatView: React.FC<ChatViewProps> = ({ conversation }) => {
    const [messages, setMessages] = useState<Message[]>(conversation.messages);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            senderId: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'sent'
        };

        setMessages([...messages, newMessage]);
        setInputText('');

        // Mock reply
        setTimeout(() => {
            const reply: Message = {
                id: (Date.now() + 1).toString(),
                text: 'Got it! I will check and get back to you soon.',
                senderId: conversation.id,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: 'delivered'
            };
            setMessages(prev => [...prev, reply]);
        }, 1500);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-view">
            <div className="chat-view__messages">
                {messages.map((msg) => (
                    <MessageBubble
                        key={msg.id}
                        message={msg}
                        isOwn={msg.senderId === 'user'}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-view__input-area">
                <button className="chat-view__attach-btn">
                    <Paperclip size={20} />
                </button>
                <div className="chat-view__input-wrapper">
                    <input
                        type="text"
                        className="chat-view__input"
                        placeholder="Type a message..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <button
                    className="chat-view__send-btn"
                    onClick={handleSend}
                    disabled={!inputText.trim()}
                >
                    <Send size={20} />
                </button>
            </div>
        </div>
    );
};
