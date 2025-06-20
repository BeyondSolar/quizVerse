import React, { createContext, useState, useMemo } from 'react';
import { loginUser, registerUser } from '../utils/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [token] = useState(() => localStorage.getItem('token') || null);
  const role = useMemo(() => user?.role || null, [user]);

  const login = async (username, password) => {
    try {
      const data = await loginUser(username, password);
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      return true;
    } catch (err) {
      console.error('Login failed:', err.response?.data || err.message);
      return false;
    }
  };

  const register = async (username, email, password, role) => {
    try {
      const data = await registerUser(username, email, password, role);
      setUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      return true;
    } catch (err) {
      console.error('Registration failed:', err.response?.data || err.message);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, role, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
