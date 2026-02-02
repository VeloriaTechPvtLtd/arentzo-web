import React, { useState } from 'react';
import type { User, Session, UserRole } from './AuthContextDefinition';
import { AuthContext } from './AuthContextDefinition';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // UI Only: Stubbing auth state
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem('isLoggedIn');
        return saved === 'true' ? { id: '1', email: 'user@example.com' } : null;
    });
    const [session] = useState<Session | null>(null);
    const [loading] = useState(false);
    const [activeRole, setActiveRole] = useState<UserRole>(() => {
        return (localStorage.getItem('activeRole') as UserRole) || 'customer';
    });

    const signIn = async () => {
        console.log('Sign in clicked (UI only)');
        setUser({ id: '1', email: 'user@example.com' });
        localStorage.setItem('isLoggedIn', 'true');
    };

    const signOut = async () => {
        console.log('Sign out clicked (UI only)');
        setUser(null);
        localStorage.removeItem('isLoggedIn');
    };

    const switchRole = (role: UserRole) => {
        setActiveRole(role);
        localStorage.setItem('activeRole', role);
    };

    return (
        <AuthContext.Provider value={{ user, session, loading, activeRole, signIn, signOut, switchRole }}>
            {children}
        </AuthContext.Provider>
    );
};
