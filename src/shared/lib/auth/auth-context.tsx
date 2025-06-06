'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useRouter } from 'next/navigation';

export interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Set cookie helper function
  // eslint-disable-next-line no-magic-numbers
  const setCookie = (name: string, value: string, days: number = 7) => {
    if (typeof window !== 'undefined') {
      const expires = new Date();

      // eslint-disable-next-line no-magic-numbers
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
      document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict`;
    }
  };

  // Remove cookie helper function
  const removeCookie = (name: string) => {
    if (typeof window !== 'undefined') {
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }
  };

  // Get token from localStorage
  const getStoredToken = (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('authToken');
    }

    return null;
  };

  // Store token in localStorage and cookie
  const storeToken = (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', token);
      setCookie('authToken', token);
    }
  };

  // Remove token from localStorage and cookie
  const removeToken = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      removeCookie('authToken');
    }
  };

  // Get user from localStorage
  const getStoredUser = (): User | null => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('authUser');

      return storedUser ? JSON.parse(storedUser) : null;
    }

    return null;
  };

  // Store user in localStorage
  const storeUser = (user: User) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('authUser', JSON.stringify(user));
    }
  };

  // Check if user is authenticated by verifying token
  const checkAuth = async (): Promise<boolean> => {
    const storedToken = await getStoredToken();
    const storedUser = await getStoredUser();

    if (!storedToken || !storedUser) {
      setIsLoading(false);

      return false;
    }

    // You can add API call here to verify token validity
    // For now, we'll just check if token exists
    try {
      setToken(storedToken);
      setUser(storedUser);
      // Sync cookie
      setCookie('authToken', storedToken);
      setIsLoading(false);

      return true;
    } catch (error) {
      // Token is invalid, clear storage
      removeToken();
      setToken(null);
      setUser(null);
      setIsLoading(false);

      return false;
    }
  };

  // Login function
  const login = (authToken: string, userData: User) => {
    setToken(authToken);
    setUser(userData);
    storeToken(authToken);
    storeUser(userData);
  };

  // Logout function
  const logout = () => {
    setToken(null);
    setUser(null);
    removeToken();
    router.push('/login');
  };

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!token && !!user,
      isLoading,
      login,
      logout,
      checkAuth,
    }),
    [user, token, isLoading, login, logout, checkAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
