import type { Session as SupabaseSession, User as AuthUser } from '@supabase/supabase-js';
import type { AuthPort } from '../../application/ports/AuthPort';
import type { LoginDTO } from '../../application/dtos/LoginDTO';
import type { Session, User, UserRole } from '../../domain/entities/User';
import { getSupabaseClient } from '@/shared/infrastructure/supabase/client';

interface ProviderRecord {
  id: string;
  status?: string | null;
  verification_status?: string | null;
  onboarding_status?: string | null;
}

export class SupabaseAuthAdapter implements AuthPort {
  async login(dto: LoginDTO): Promise<Session> {
    const { data, error } = await getSupabaseClient().auth.signInWithPassword(dto);
    if (error) throw error;
    if (!data.session) throw new Error('Authentication session was not returned.');
    return this.mapSession(data.session);
  }

  async verifyOtp(email: string, otp: string): Promise<Session> {
    const { data, error } = await getSupabaseClient().auth.verifyOtp({
      email,
      token: otp,
      type: 'email',
    });
    if (error) throw error;
    if (!data.session) throw new Error('Authentication session was not returned.');
    return this.mapSession(data.session);
  }

  async signUp(email: string, password: string, name: string): Promise<Session | null> {
    const { data, error } = await getSupabaseClient().auth.signUp({
      email,
      password,
      options: { data: { full_name: name }, emailRedirectTo: `${window.location.origin}/auth/callback?next=%2F` },
    });
    if (error) throw error;
    return data.session ? this.mapSession(data.session) : null;
  }

  async forgotPassword(email: string): Promise<void> {
    const redirectTo = `${window.location.origin}/auth/callback?next=%2Freset-password`;
    const { error } = await getSupabaseClient().auth.resetPasswordForEmail(email, { redirectTo });
    if (error) throw error;
  }

  async verifyResetOtp(email: string, otp: string): Promise<boolean> {
    const { data, error } = await getSupabaseClient().auth.verifyOtp({
      email,
      token: otp,
      type: 'recovery',
    });
    if (error) throw error;
    return Boolean(data.session);
  }

  async resetPassword(email: string, otp: string, password: string): Promise<void> {
    const client = getSupabaseClient();
    const { data } = await client.auth.getSession();
    if (!data.session && !(await this.verifyResetOtp(email, otp))) {
      throw new Error('Password recovery session was not returned.');
    }
    await this.updatePassword(password);
  }

  async updatePassword(password: string): Promise<void> {
    const { error } = await getSupabaseClient().auth.updateUser({ password });
    if (error) throw error;
  }

  async signOut(): Promise<void> {
    const { error } = await getSupabaseClient().auth.signOut();
    if (error) throw error;
  }

  async getSession(): Promise<Session | null> {
    const { data, error } = await getSupabaseClient().auth.getSession();
    if (error) throw error;
    return data.session ? this.mapSession(data.session) : null;
  }

  async refreshSession(refreshToken: string): Promise<Session> {
    const { data, error } = await getSupabaseClient().auth.refreshSession({ refresh_token: refreshToken });
    if (error) throw error;
    if (!data.session) throw new Error('Authentication session was not returned.');
    return this.mapSession(data.session);
  }

  async completeAuthCallback(code: string): Promise<Session> {
    const { data, error } = await getSupabaseClient().auth.exchangeCodeForSession(code);
    if (error) throw error;
    if (!data.session) throw new Error('Authentication session was not returned.');
    return this.mapSession(data.session);
  }

  subscribeToAuthChanges(listener: (session: Session | null) => void): () => void {
    const { data } = getSupabaseClient().auth.onAuthStateChange((_event, session) => {
      window.setTimeout(() => void this.notifyListener(session, listener), 0);
    });
    return () => data.subscription.unsubscribe();
  }

  private async notifyListener(
    session: SupabaseSession | null,
    listener: (session: Session | null) => void,
  ): Promise<void> {
    try {
      listener(session ? await this.mapSession(session) : null);
    } catch {
      listener(null);
    }
  }

  private async mapSession(session: SupabaseSession): Promise<Session> {
    const user = await this.mapUser(session.user);
    return {
      user,
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
      expiresAt: (session.expires_at ?? 0) * 1000,
    };
  }

  private async mapUser(authUser: AuthUser): Promise<User> {
    const provider = await this.findProvider(authUser.id);
    return {
      id: authUser.id,
      email: authUser.email ?? '',
      name: this.getDisplayName(authUser),
      avatarUrl: this.getAvatarUrl(authUser),
      role: this.getRole(authUser, provider),
      providerId: provider?.id,
      providerStatus: this.getProviderStatus(provider),
    };
  }

  private async findProvider(userId: string): Promise<ProviderRecord | null> {
    const { data, error } = await getSupabaseClient()
      .from('service_providers')
      .select('id, status, verification_status, onboarding_status')
      .eq('user_id', userId)
      .maybeSingle();
    if (error) return null;
    return data as ProviderRecord | null;
  }

  private getRole(authUser: AuthUser, provider: ProviderRecord | null): UserRole {
    const appMetadata = authUser.app_metadata as Record<string, unknown>;
    const role = appMetadata.role ?? appMetadata.user_role;
    return role === 'service_provider' || provider ? 'service_provider' : 'customer';
  }

  private getDisplayName(authUser: AuthUser): string | undefined {
    const metadata = authUser.user_metadata as Record<string, unknown>;
    const name = metadata.full_name ?? metadata.name;
    return typeof name === 'string' ? name : undefined;
  }

  private getAvatarUrl(authUser: AuthUser): string | undefined {
    const metadata = authUser.user_metadata as Record<string, unknown>;
    const avatarUrl = metadata.avatar_url;
    return typeof avatarUrl === 'string' ? avatarUrl : undefined;
  }

  private getProviderStatus(provider: ProviderRecord | null): string | undefined {
    return provider?.verification_status ?? provider?.onboarding_status ?? provider?.status ?? undefined;
  }
}
