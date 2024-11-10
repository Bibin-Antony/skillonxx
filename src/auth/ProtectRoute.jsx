// src/auth/ProtectRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

export const ProtectedRoute = ({ allowedUserTypes, children }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth) {
    // Redirect to login if not authenticated
    return <Navigate to="/LoginPage" state={{ from: location }} replace />;
  }

  // Check if user type matches allowed types
  if (!allowedUserTypes.includes(auth.user.userType)) {
    // Redirect to appropriate dashboard based on user type
    const redirectPath = auth.user.userType === 'student' 
      ? '/student-dashboard' 
      : '/university-dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;