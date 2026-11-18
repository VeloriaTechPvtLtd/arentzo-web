import type { ChatRepository } from '../ports/ChatRepository';

export class ChatService {
  constructor(private readonly repository: ChatRepository) {}

  listConversations(userId: string) {
    if (!userId) throw new Error('Sign in to view messages.');
    return this.repository.getConversations(userId);
  }

  listMessages(conversationId: string) {
    if (!conversationId) throw new Error('Choose a conversation first.');
    return this.repository.getMessages(conversationId);
  }

  send(userId: string, conversationId: string, message: string) {
    const content = message.trim();
    if (!userId) throw new Error('Sign in to send messages.');
    if (!conversationId) throw new Error('Choose a conversation first.');
    if (!content || content.length > 4000) throw new Error('Messages must be 1–4,000 characters.');
    return this.repository.sendMessage({ conversationId, senderId: userId, message: content });
  }
}
