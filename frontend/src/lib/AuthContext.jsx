import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check auth status on mount
  useEffect(() => {
    const initAuth = async () => {
      // Check if there's a token in URL (from Google redirect)
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      const authSuccess = urlParams.get('auth');

      if (token) {
        localStorage.setItem('artpark_token', token);
        // Clean URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      try {
        const userData = await api.getCurrentUser();
        if (userData?.user) {
          setUser(userData.user);
          setIsLoggedIn(true);
        }
      } catch (err) {
        // 401/error is often expected when not logged in — handle silently
        localStorage.removeItem('artpark_token');
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = () => {
    api.loginWithGoogle();
  };

  const logout = async () => {
    try {
      await api.logout();
    } finally {
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem('artpark_token');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
