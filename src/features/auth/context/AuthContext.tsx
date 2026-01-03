import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
    user: any | null;
    session: any | null;
    loading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // UI Only: Stubbing auth state
    const [user] = useState<any | null>(null);
    const [session] = useState<any | null>(null);
    const [loading] = useState(false);

    const signOut = async () => {
        console.log('Sign out clicked (UI only)');
    };

    return (
        <AuthContext.Provider value={{ user, session, loading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
