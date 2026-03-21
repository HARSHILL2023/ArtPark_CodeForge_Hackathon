import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    // Synchronous Initialization from LocalStorage
    try {
      const token = localStorage.getItem('artpark_token');
      if (!token) return { user: null, isLoggedIn: false };

      // Handle Demo Token
      if (token === 'demo_token_judge_12345') {
        return {
          isLoggedIn: true,
          user: {
            id: 'DEMO_12345',
            name: 'Judge Demo User',
            email: 'judge@example.com',
            avatar: 'https://ui-avatars.com/api/?name=Judge+Demo&background=indigo&color=fff',
            role: 'Judge / Reviewer'
          }
        };
      }

      // Quick decode to get user info (payload is 2nd part of JWT)
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));

      // Check expiry
      if (payload.exp && payload.exp * 1000 < Date.now()) {
        localStorage.removeItem('artpark_token');
        return { user: null, isLoggedIn: false };
      }

      return {
        isLoggedIn: true,
        user: {
          id: payload.id,
          name: payload.name,
          email: payload.email,
          avatar: payload.avatar,
          role: payload.role
        }
      };
    } catch (err) {
      console.error("Auth sync init failed:", err);
      return { user: null, isLoggedIn: false };
    }
  });

  const [isLoading, setIsLoading] = useState(true);

  // Still verify with backend on mount to ensure session validity
  useEffect(() => {
    const verifyAuth = async () => {
      if (!authState.isLoggedIn) {
        setIsLoading(false);
        return;
      }
      
      // If it's a demo token, don't verify with backend
      if (localStorage.getItem('artpark_token') === 'demo_token_judge_12345') {
        setIsLoading(false);
        return;
      }

      try {
        const userData = await api.getCurrentUser();
        if (userData?.user) {
          setAuthState({ user: userData.user, isLoggedIn: true });
        } else {
          throw new Error("Invalid session");
        }
      } catch (err) {
        localStorage.removeItem('artpark_token');
        setAuthState({ user: null, isLoggedIn: false });
      } finally {
        setIsLoading(false);
      }
    };

    verifyAuth();
  }, []);

  const login = (data) => {
    if (data?.token) {
      localStorage.setItem('artpark_token', data.token);
      setAuthState({ user: data.user, isLoggedIn: true });
    } else {
      api.loginWithGoogle();
    }
  };

  const demoLogin = () => {
    const fakeToken = 'demo_token_judge_12345';
    localStorage.setItem('artpark_token', fakeToken);
    const demoUser = {
      id: 'DEMO_12345',
      name: 'Judge Demo User',
      email: 'judge@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Judge+Demo&background=indigo&color=fff',
      role: 'Judge / Reviewer'
    };
    setAuthState({ user: demoUser, isLoggedIn: true });
  };

  const logout = async () => {
    try {
      if (localStorage.getItem('artpark_token') !== 'demo_token_judge_12345') {
        await api.logout();
      }
    } finally {
      setAuthState({ user: null, isLoggedIn: false });
      localStorage.removeItem('artpark_token');
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, isLoading, login, demoLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
