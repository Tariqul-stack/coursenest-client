'use client';

import { useState, useEffect, useCallback } from 'react';
import { IUser } from '@/types';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;
  role: string;
  exp: number;
}

// Global state for auth
let globalUser: IUser | null = null;
let globalToken: string | null = null;
const listeners: Set<() => void> = new Set();

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

export const useAuth = () => {
  const [user, setUser] = useState<IUser | null>(globalUser);
  const [token, setToken] = useState<string | null>(globalToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Subscribe to global state changes
    const listener = () => {
      setUser(globalUser);
      setToken(globalToken);
    };
    listeners.add(listener);

    // Initialize from localStorage
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const decoded = jwtDecode<DecodedToken>(storedToken);
        if (decoded.exp * 1000 > Date.now()) {
          globalToken = storedToken;
          globalUser = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } catch {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);

    return () => {
      listeners.delete(listener);
    };
  }, []);

  const login = useCallback((newToken: string, newUser: IUser) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    globalToken = newToken;
    globalUser = newUser;
    setToken(newToken);
    setUser(newUser);
    notifyListeners();
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    globalToken = null;
    globalUser = null;
    setToken(null);
    setUser(null);
    notifyListeners();
  }, []);

  return {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: !!token,
    isStudent: user?.role === 'student',
    isTeacher: user?.role === 'teacher',
    isAdmin: user?.role === 'admin',
  };
};