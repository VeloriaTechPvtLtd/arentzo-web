import { getSupabaseClient } from '@/shared/infrastructure/supabase/client';
import type { ChatRepository } from '../application/ports/ChatRepository';
import type { Conversation, Message } from '../domain/entities/types';

type ConversationRow = {
  id: string;
  participant1_id: string;
  participant2_id: string;
  name: string | null;
  product_image_url: string | null;
  product_title: string | null;
  last_message_preview: string | null;
  last_message: string | null;
  last_message_at: string | null;
  last_message_sender_id: string | null;
  participant1_unread_count: number | null;
  participant2_unread_count: number | null;
  renter_unread_count: number | null;
  provider_unread_count: number | null;
  is_active: boolean | null;
  blocked_by: string | null;
};

type ParticipantProfile = { full_name?: string | null; avatar_url?: string | null };
type MessageRow = {
  id: string;
  conversation_id: string;
  sender_id: string;
  message_type: string | null;
  message_text: string | null;
  sent_at: string | null;
  is_read: boolean | null;
  is_delivered: boolean | null;
  is_deleted: boolean | null;
};

const conversationColumns = 'id,participant1_id,participant2_id,name,product_image_url,product_title,last_message_preview,last_message,last_message_at,last_message_sender_id,participant1_unread_count,participant2_unread_count,renter_unread_count,provider_unread_count,is_active,blocked_by,created_at';
const messageColumns = 'id,conversation_id,sender_id,message_type,message_text,sent_at,is_read,is_delivered,is_deleted';

function mapMessage(row: MessageRow): Message {
  const isDeleted = row.is_deleted === true;
  const sentAt = row.sent_at ? new Date(row.sent_at) : new Date(0);
  return {
    id: row.id,
    text: isDeleted ? 'Message removed' : (row.message_text || ''),
    senderId: row.sender_id,
    timestamp: Number.isNaN(sentAt.getTime()) ? '' : new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit' }).format(sentAt),
    status: row.is_read ? 'read' : row.is_delivered ? 'delivered' : 'sent',
    isDeleted,
  };
}

export class SupabaseChatRepository implements ChatRepository {
  async getConversations(userId: string): Promise<Conversation[]> {
    const { data, error } = await getSupabaseClient().from('conversations')
      .select(conversationColumns)
      .or(`participant1_id.eq.${userId},participant2_id.eq.${userId}`)
      .order('last_message_at', { ascending: false, nullsFirst: false })
      .limit(50);
    if (error) throw error;

    const rows = (data || []) as ConversationRow[];
    const otherUserIds = [...new Set(rows.map((row) => row.participant1_id === userId ? row.participant2_id : row.participant1_id))];
    const profiles = new Map<string, ParticipantProfile>();
    await Promise.all(otherUserIds.map(async (id) => {
      try {
        const { data: profile, error: profileError } = await getSupabaseClient().rpc('get_chat_participant_profile', { p_user_id: id });
        if (!profileError && profile && typeof profile === 'object') profiles.set(id, profile as ParticipantProfile);
      } catch {
        // The conversation row still provides a safe generic display label if this RPC is unavailable.
      }
    }));

    return rows.map((row) => {
      const otherUserId = row.participant1_id === userId ? row.participant2_id : row.participant1_id;
      const isParticipant1 = row.participant1_id === userId;
      const unread = isParticipant1
        ? row.participant1_unread_count ?? row.renter_unread_count ?? 0
        : row.participant2_unread_count ?? row.provider_unread_count ?? 0;
      const profile = profiles.get(otherUserId);
      return {
        id: row.id,
        participantUserId: otherUserId,
        participantName: row.name || profile?.full_name || 'Arentzo user',
        participantAvatar: profile?.avatar_url || row.product_image_url,
        lastMessage: row.last_message_preview || row.last_message || '',
        lastMessageTime: row.last_message_at ? new Intl.DateTimeFormat('en-IN', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(row.last_message_at)) : '',
        unreadCount: unread,
        isOnline: false,
        isActive: row.is_active !== false,
        blockedBy: row.blocked_by,
        messages: [],
      };
    });
  }

  async getMessages(conversationId: string): Promise<Message[]> {
    const { data, error } = await getSupabaseClient().from('messages')
      .select(messageColumns).eq('conversation_id', conversationId)
      .order('sent_at', { ascending: true }).range(0, 199);
    if (error) throw error;
    return ((data || []) as MessageRow[]).map(mapMessage);
  }

  async sendMessage(input: { conversationId: string; senderId: string; message: string }): Promise<Message> {
    const id = crypto.randomUUID();
    const sentAt = new Date();
    const { error } = await getSupabaseClient().from('messages').upsert({
      id,
      conversation_id: input.conversationId,
      sender_id: input.senderId,
      message_type: 'text',
      sent_at: sentAt.toISOString(),
      message_text: input.message,
      reply_to_message_id: null,
    }, { onConflict: 'id', ignoreDuplicates: true });
    if (error) throw error;
    return {
      id,
      text: input.message,
      senderId: input.senderId,
      timestamp: new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit' }).format(sentAt),
      status: 'sent',
    };
  }
}
