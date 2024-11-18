// src/auth/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return token && user ? { token, user: JSON.parse(user) } : null;
  });

  const login = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({ token, user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth(null);
  };

  // User type checks
  const isStudent = () => auth?.user?.userType === 'student';
  const isUniversity = () => auth?.user?.userType === 'university';
  const isAdmin = () => auth?.user?.userType === 'admin';

  // Get dashboard route based on user type
  const getDashboardRoute = () => {
    switch (auth?.user?.userType) {
      case 'admin':
        return '/admin';
      case 'student':
        return '/student-dashboard';
      case 'university':
        return '/university-dashboard';
      default:
        return '/';
    }
  };

  return (
    <AuthContext.Provider value={{ 
      auth, 
      login, 
      logout, 
      isStudent, 
      isUniversity, 
      isAdmin,
      getDashboardRoute 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;