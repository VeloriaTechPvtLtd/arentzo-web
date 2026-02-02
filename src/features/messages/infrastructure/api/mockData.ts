import type { Conversation } from '../../domain/entities/types';

export const mockConversations: Conversation[] = [
    {
        id: '1',
        participantName: 'Rahul Sharma',
        participantAvatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80',
        lastMessage: 'Is the camera still available for rent?',
        lastMessageTime: '10:30 AM',
        unreadCount: 2,
        isOnline: true,
        messages: [
            {
                id: 'm1',
                text: 'Hi Rahul, yes it is!',
                senderId: 'user',
                timestamp: '10:25 AM',
                status: 'read'
            },
            {
                id: 'm2',
                text: 'Is the camera still available for rent?',
                senderId: '1',
                timestamp: '10:30 AM',
                status: 'delivered'
            }
        ]
    },
    {
        id: '2',
        participantName: 'Priya Patel',
        participantAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
        lastMessage: 'The bike was amazing, thanks!',
        lastMessageTime: 'Yesterday',
        unreadCount: 0,
        isOnline: false,
        messages: [
            {
                id: 'm3',
                text: 'The bike was amazing, thanks!',
                senderId: '2',
                timestamp: 'Yesterday',
                status: 'read'
            }
        ]
    },
    {
        id: '3',
        participantName: 'Amit Verma',
        participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
        lastMessage: 'Sending the location now.',
        lastMessageTime: 'Monday',
        unreadCount: 0,
        isOnline: true,
        messages: [
            {
                id: 'm4',
                text: 'Sending the location now.',
                senderId: '3',
                timestamp: 'Monday',
                status: 'read'
            }
        ]
    }
];
