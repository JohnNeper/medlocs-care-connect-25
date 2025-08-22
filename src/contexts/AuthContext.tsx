import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  allergies?: string[];
  treatments?: string[];
  doctor?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        logout();
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mock authentication - replace with real API call
      const mockUser: User = {
        id: '1',
        email,
        firstName: 'Jean',
        lastName: 'Dupont',
        phone: '06 12 34 56 78',
        dateOfBirth: '1985-05-15',
        allergies: ['Pénicilline', 'Aspirine'],
        treatments: [],
        doctor: 'Dr. Martin Leroy'
      };

      const token = 'mock-jwt-token-' + Date.now();
      
      Cookies.set('authToken', token, { expires: 7 });
      localStorage.setItem('userData', JSON.stringify(mockUser));
      
      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error('Identifiants incorrects');
    }
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }) => {
    try {
      // Mock registration - replace with real API call
      const newUser: User = {
        ...userData,
        id: 'user-' + Date.now(),
      };
      
      const token = 'mock-jwt-token-' + Date.now();
      
      Cookies.set('authToken', token, { expires: 7 });
      localStorage.setItem('userData', JSON.stringify(newUser));
      
      setUser(newUser);
      setIsAuthenticated(true);
    } catch (error) {
      throw new Error('Erreur lors de l\'inscription');
    }
  };

  const logout = () => {
    Cookies.remove('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      login,
      register,
      logout,
      updateUser
    }}>
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