import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isLoggedIn, user } = useUser();
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && !user?.isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ProtectedRoute;