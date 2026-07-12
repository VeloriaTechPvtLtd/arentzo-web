'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AuthContext } from './AuthContextDefinition';
import { AuthService } from '../../application/services/AuthService';
import { MockAuthAdapter } from '../../infrastructure/adapters/MockAuthAdapter';
import type { User, Session, UserRole } from '../../domain/entities/User';

// Initialize Service (Dependency Injection Root for Feature)
// In a real app, this might come from a DI container or Prop
const authAdapter = new MockAuthAdapter();
const authService = new AuthService(authAdapter);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeRole, setActiveRole] = useState<UserRole>('customer');

    useEffect(() => {
        if (user) {
            setActiveRole(user.role);
        } else {
            setActiveRole('customer');
        }
    }, [user]);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const currentSession = await authService.getSession();
                if (currentSession) {
                    setSession(currentSession);
                    setUser(currentSession.user);
                }
            } catch (error) {
                console.error('Failed to restore session:', error);
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    const signIn = async (email: string, password?: string) => {
        setLoading(true);
        try {
            // AuthService expects LoginDTO which has { email, password? }
            const session = await authService.login({ email, password });
            setSession(session);
            setUser(session.user);
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const verifyOtp = async (email: string, otp: string) => {
        setLoading(true);
        try {
            // Updated service signature expects VerifyOtpDTO
            const session = await authService.verifyOtp({ email, otp });
            setSession(session);
            setUser(session.user);
        } catch (error) {
            console.error('OTP verification error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (email: string, name: string) => {
        setLoading(true);
        try {
            await authService.signUp(email, name);
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const forgotPassword = async (email: string) => {
        setLoading(true);
        try {
            await authService.forgotPassword(email);
        } catch (error) {
            console.error('Forgot password error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const verifyResetOtp = async (email: string, otp: string) => {
        setLoading(true);
        try {
            return await authService.verifyResetOtp(email, otp);
        } catch (error) {
            console.error('Verify Reset OTP error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const resetPassword = async (email: string, otp: string, password: string) => {
        setLoading(true);
        try {
            await authService.resetPassword(email, otp, password);
        } catch (error) {
            console.error('Reset password error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signOut = async () => {
        setLoading(true);
        try {
            await authService.signOut();
            setSession(null);
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setLoading(false);
        }
    };

    const switchRole = useCallback((role: UserRole) => {
        setActiveRole(role);
        setUser((prev) => (prev ? { ...prev, role } : null));
        setSession((prev) =>
            prev ? { ...prev, user: { ...prev.user, role } } : null
        );
    }, []);

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
        signOut,
        activeRole,
        switchRole
    }), [user, session, loading, activeRole, switchRole]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
