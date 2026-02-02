export interface Message {
    id: string;
    text: string;
    senderId: string;
    timestamp: string;
    status: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
    id: string;
    participantName: string;
    participantAvatar: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    isOnline: boolean;
    messages: Message[];
}

export type MessagesView = 'list' | 'chat';
