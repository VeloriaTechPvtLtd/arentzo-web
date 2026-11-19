export interface Message {
    id: string;
    text: string;
    senderId: string;
    timestamp: string;
    status: 'sent' | 'delivered' | 'read';
    isDeleted?: boolean;
}

export interface Conversation {
    id: string;
    participantUserId: string;
    participantName: string;
    participantAvatar: string | null;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
    isOnline: boolean;
    isActive: boolean;
    blockedBy: string | null;
    messages: Message[];
}

export type MessagesView = 'list' | 'chat';
