import type { Conversation, Message } from '../../domain/entities/types';

export interface ChatRepository {
  getConversations(userId: string): Promise<Conversation[]>;
  getMessages(conversationId: string): Promise<Message[]>;
  sendMessage(input: { conversationId: string; senderId: string; message: string }): Promise<Message>;
}
