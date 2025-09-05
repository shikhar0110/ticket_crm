import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  login: (userData: any) => void;
  logout: () => void;
  setAdminAuth: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const savedIsAdmin = localStorage.getItem('isAdmin');

    if (savedToken) {
      setToken(savedToken);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      if (savedIsAdmin === 'true') {
        setIsAdmin(true);
      }
    }
  }, []);

  const login = (userData: any) => {
    setUser(userData.user);
    setToken(userData.token);
    setIsAdmin(false);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user));
    localStorage.setItem('isAdmin', 'false');
  };

  const setAdminAuth = (adminToken: string) => {
    setToken(adminToken);
    setIsAdmin(true);
    setUser(null);
    localStorage.setItem('token', adminToken);
    localStorage.setItem('isAdmin', 'true');
    localStorage.removeItem('user');
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAdmin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAdmin');
  };

  return (
    <AuthContext.Provider value={{ user, token, isAdmin, login, logout, setAdminAuth }}>
      {children}
    </AuthContext.Provider>
  );
};