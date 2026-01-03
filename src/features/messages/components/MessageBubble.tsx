import React from 'react';
import type { Message } from '../types';
import { Check, CheckCheck } from 'lucide-react';

interface MessageBubbleProps {
    message: Message;
    isOwn: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwn }) => {
    return (
        <div className={`message-bubble ${isOwn ? 'message-bubble--sent' : 'message-bubble--received'}`}>
            <div className="message-bubble__content">
                {message.text}
            </div>
            <div className="message-bubble__footer">
                <span>{message.timestamp}</span>
                {isOwn && (
                    <span className="message-bubble__status">
                        {message.status === 'read' ? (
                            <CheckCheck size={14} color="#3b82f6" />
                        ) : (
                            <Check size={14} />
                        )}
                    </span>
                )}
            </div>
        </div>
    );
};
