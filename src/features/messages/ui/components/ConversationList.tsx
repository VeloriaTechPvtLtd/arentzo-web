import React from 'react';
import type { Conversation } from '../../domain/entities/types';

interface ConversationListProps {
    conversations: Conversation[];
    onSelectConversation: (conversation: Conversation) => void;
}

export const ConversationList: React.FC<ConversationListProps> = ({ conversations, onSelectConversation }) => {
    return (
        <div className="conversation-list">
            {conversations.map((conv) => (
                <div
                    key={conv.id}
                    className="conversation-item"
                    onClick={() => onSelectConversation(conv)}
                >
                    <div className="conversation-item__avatar-wrapper">
                        <img src={conv.participantAvatar} alt={conv.participantName} className="conversation-item__avatar" />
                        {conv.isOnline && <div className="conversation-item__status" />}
                    </div>
                    <div className="conversation-item__info">
                        <div className="conversation-item__header">
                            <h4 className="conversation-item__name">{conv.participantName}</h4>
                            <span className="conversation-item__time">{conv.lastMessageTime}</span>
                        </div>
                        <div className="conversation-item__last-message">
                            <p className="conversation-item__text">{conv.lastMessage}</p>
                            {conv.unreadCount > 0 && (
                                <span className="conversation-item__badge">{conv.unreadCount}</span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
