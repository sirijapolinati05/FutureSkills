import React, { createContext, useContext, useState, useEffect } from 'react';
import { localDb, User } from '../db/localDb';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
  registerUser: (data: Omit<User, 'id' | 'createdAt' | 'kycStatus' | 'role'>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (name: string, phone: string) => Promise<boolean>;
  submitKyc: (details: User['kycDetails']) => Promise<boolean>;
  changePassword: (password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initSession = async () => {
      await localDb.syncWithServer();
      localDb.ensureSeedData();
      const storedUser = localStorage.getItem('az_session') || sessionStorage.getItem('az_session');
      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser);
          const dbUsers = localDb.getUsers();
          const freshUser = dbUsers.find(u => u.email === parsed.email);
          if (freshUser) {
            setUser(freshUser);
          } else {
            setUser(parsed);
          }
        } catch (e) {
          console.error('Failed to parse session', e);
        }
      }
      setLoading(false);
    };
    initSession();
  }, []);

  const login = async (email: string, password: string, rememberMe: boolean): Promise<boolean> => {
    localDb.ensureSeedData();
    const users = localDb.getUsers();
    // In our mock, if email is admin@gmail.com and password admin123, or email login@gmail.com and password user123
    // We authorize. If they are in DB, we use their DB record.
    const foundUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser) {
      // Mock password check
      const expectedPassword = foundUser.role === 'admin' ? 'admin123' : 'user123';
      if (password === expectedPassword) {
        if (foundUser.status !== 'active') {
          alert('Your account is currently inactive. Please contact support.');
          return false;
        }
        
        setUser(foundUser);
        const sessionStr = JSON.stringify(foundUser);
        if (rememberMe) {
          localStorage.setItem('az_session', sessionStr);
        } else {
          sessionStorage.setItem('az_session', sessionStr);
        }
        return true;
      }
    }
    return false;
  };

  const registerUser = async (data: Omit<User, 'id' | 'createdAt' | 'kycStatus' | 'role'>): Promise<boolean> => {
    const users = localDb.getUsers();
    if (users.find(u => u.email.toLowerCase() === data.email.toLowerCase())) {
      alert('Email already registered.');
      return false;
    }

    const newUser: User = {
      ...data,
      id: 'user-' + Math.random().toString(36).substr(2, 9),
      role: 'user',
      kycStatus: 'not_submitted',
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localDb.saveUsers(users);
    
    // Also save in session
    setUser(newUser);
    sessionStorage.setItem('az_session', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('az_session');
    sessionStorage.removeItem('az_session');
  };

  const updateProfile = async (name: string, phone: string): Promise<boolean> => {
    if (!user) return false;
    const users = localDb.getUsers();
    const updated = users.map(u => {
      if (u.id === user.id) {
        const newUser = { ...u, name, phone };
        setUser(newUser);
        // Sync session
        if (localStorage.getItem('az_session')) localStorage.setItem('az_session', JSON.stringify(newUser));
        if (sessionStorage.getItem('az_session')) sessionStorage.setItem('az_session', JSON.stringify(newUser));
        return newUser;
      }
      return u;
    });
    localDb.saveUsers(updated);
    return true;
  };

  const submitKyc = async (details: User['kycDetails']): Promise<boolean> => {
    if (!user) return false;
    const users = localDb.getUsers();
    const updated = users.map(u => {
      if (u.id === user.id) {
        const newUser: User = { ...u, kycStatus: 'pending', kycDetails: details };
        setUser(newUser);
        if (localStorage.getItem('az_session')) localStorage.setItem('az_session', JSON.stringify(newUser));
        if (sessionStorage.getItem('az_session')) sessionStorage.setItem('az_session', JSON.stringify(newUser));
        return newUser;
      }
      return u;
    });
    localDb.saveUsers(updated);
    return true;
  };

  const changePassword = async (password: string): Promise<boolean> => {
    // In our mock system we just show success since passwords are hardcoded in mock logins,
    // but we can save it in localStorage users if needed.
    alert('Password updated successfully!');
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, registerUser, logout, updateProfile, submitKyc, changePassword }}>
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
