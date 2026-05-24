import React, { createContext, useContext, useState, useEffect } from 'react';
import { localDb, User } from '../db/localDb';

interface AuthContextType {
  admin: User | null;
  loading: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initSession = async () => {
      await localDb.syncWithServer();
      const storedAdmin = localStorage.getItem('az_admin_session') || sessionStorage.getItem('az_admin_session');
      if (storedAdmin) {
        try {
          const parsed = JSON.parse(storedAdmin);
          const dbUsers = localDb.getUsers();
          const freshAdmin = dbUsers.find(u => u.email === parsed.email && u.role === 'admin');
          if (freshAdmin) {
            setAdmin(freshAdmin);
          } else {
            setAdmin(parsed);
          }
        } catch (e) {
          console.error('Failed to parse admin session', e);
        }
      }
      setLoading(false);
    };
    initSession();
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean): Promise<boolean> => {
    const users = localDb.getUsers();
    const foundAdmin = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.role === 'admin'
    );
    
    if (foundAdmin) {
      if (password === 'admin123') {
        if (foundAdmin.status !== 'active') {
          alert('Admin account is disabled.');
          return false;
        }
        
        setAdmin(foundAdmin);
        const sessionStr = JSON.stringify(foundAdmin);
        if (rememberMe) {
          localStorage.setItem('az_admin_session', sessionStr);
        } else {
          sessionStorage.setItem('az_admin_session', sessionStr);
        }
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('az_admin_session');
    sessionStorage.removeItem('az_admin_session');
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout }}>
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
