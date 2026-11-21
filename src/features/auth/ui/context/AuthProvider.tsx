'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContextDefinition';
import { keepRoleSelection, resolveActiveRole, type RoleSelection } from '../../application/services/activeRoleSelection';
import { AuthService } from '../../application/services/AuthService';
import { SupabaseAuthAdapter } from '../../infrastructure/adapters/SupabaseAuthAdapter';
import type { Session, User, UserRole } from '../../domain/entities/User';

const authService = new AuthService(new SupabaseAuthAdapter());

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [roleSelection, setRoleSelection] = useState<RoleSelection|null>(null);
  const activeRole = resolveActiveRole(user,roleSelection);

  const acceptSession = useCallback((nextSession: Session | null) => {
    setSession(nextSession);
    setUser(nextSession?.user ?? null);
    setRoleSelection(previous=>keepRoleSelection(previous,nextSession?.user ?? null));
  }, []);

  useEffect(() => {
    let isMounted = true;
    const unsubscribe = authService.subscribeToAuthChanges(acceptSession);
    void authService.getSession()
      .then((currentSession) => {
        if (isMounted) acceptSession(currentSession);
      })
      .catch(() => {
        if (isMounted) acceptSession(null);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [acceptSession]);

  const signIn = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      acceptSession(await authService.login({ email, password }));
    } finally {
      setLoading(false);
    }
  }, [acceptSession]);

  const verifyOtp = useCallback(async (email: string, otp: string) => {
    setLoading(true);
    try {
      acceptSession(await authService.verifyOtp({ email, otp }));
    } finally {
      setLoading(false);
    }
  }, [acceptSession]);

  const signUp = useCallback(async (email: string, name: string, password: string) => {
    setLoading(true);
    try {
      const nextSession = await authService.signUp(email, password, name);
      acceptSession(nextSession);
      return Boolean(nextSession);
    } finally {
      setLoading(false);
    }
  }, [acceptSession]);

  const forgotPassword = useCallback(async (email: string) => {
    setLoading(true);
    try {
      await authService.forgotPassword(email);
    } finally {
      setLoading(false);
    }
  }, []);

  const verifyResetOtp = useCallback(async (email: string, otp: string) => {
    setLoading(true);
    try {
      return await authService.verifyResetOtp(email, otp);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetPassword = useCallback(async (email: string, otp: string, password: string) => {
    setLoading(true);
    try {
      await authService.resetPassword(email, otp, password);
    } finally {
      setLoading(false);
    }
  }, []);

  const updatePassword = useCallback(async (password: string) => {
    setLoading(true);
    try {
      await authService.updatePassword(password);
    } finally {
      setLoading(false);
    }
  }, []);

  const completeAuthCallback = useCallback(async (code: string) => {
    setLoading(true);
    try {
      acceptSession(await authService.completeAuthCallback(code));
    } finally {
      setLoading(false);
    }
  }, [acceptSession]);

  const signOut = useCallback(async () => {
    setLoading(true);
    try {
      await authService.signOut();
      acceptSession(null);
    } finally {
      setLoading(false);
    }
  }, [acceptSession]);

  const switchRole = useCallback((role: UserRole) => {
    if (!user || (role === 'service_provider' && user.role !== 'service_provider')) return;
    setRoleSelection({ownerId:user.id,role});
  }, [user]);

  const value = useMemo(() => ({
    user,
    session,
    loading,
    signIn,
    verifyOtp,
    signUp,
    forgotPassword,
    verifyResetOtp,
    resetPassword,
    updatePassword,
    completeAuthCallback,
    signOut,
    activeRole,
    switchRole,
  }), [
    user,
    session,
    loading,
    signIn,
    verifyOtp,
    signUp,
    forgotPassword,
    verifyResetOtp,
    resetPassword,
    updatePassword,
    completeAuthCallback,
    signOut,
    activeRole,
    switchRole,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
