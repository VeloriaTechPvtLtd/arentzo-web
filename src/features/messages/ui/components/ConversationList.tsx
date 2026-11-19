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
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelectConversation(conv)}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault();
                            onSelectConversation(conv);
                        }
                    }}
                >
                    <div className="conversation-item__avatar-wrapper">
                        {conv.participantAvatar ? <img src={conv.participantAvatar} alt="" className="conversation-item__avatar" /> : <div className="conversation-item__avatar-placeholder" aria-hidden="true">{conv.participantName.slice(0, 1).toUpperCase()}</div>}
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
