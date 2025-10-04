import React, { createContext, useState, useContext, useEffect } from 'react';
import apiFetch from '../lib/api';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        try {
          const response = await apiFetch('https://binit-1fpv.onrender.com/users');
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
          }
        } catch (error) {
          console.error("Initialization fetch failed:", error);
        }
      }
      setLoading(false);
    };

    initializeUser();
  }, []);

  const login = async (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    setLoading(true);
    try {
      const response = await apiFetch('https://binit-1fpv.onrender.com/users');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        return userData; // Return user data for navigation purposes
      } else {
        throw new Error("Failed to fetch user after login");
      }
    } catch (error) {
        console.error("Login fetch failed:", error);
        // Clear tokens if user fetch fails
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setUser(null);
        throw error; // re-throw for the component to handle
    } finally {
        setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
