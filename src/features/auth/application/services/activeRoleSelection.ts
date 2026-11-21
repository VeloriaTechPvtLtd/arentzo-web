import type { User, UserRole } from '../../domain/entities/User';

export interface RoleSelection { ownerId: string; role: UserRole }

export function keepRoleSelection(previous:RoleSelection|null,user:User|null):RoleSelection|null {
  if (!user || previous?.ownerId !== user.id ||
      (previous.role === 'service_provider' && user.role !== 'service_provider')) return null;
  return previous;
}

export function resolveActiveRole(user:User|null,selection:RoleSelection|null):UserRole {
  return keepRoleSelection(selection,user)?.role ?? user?.role ?? 'customer';
}
