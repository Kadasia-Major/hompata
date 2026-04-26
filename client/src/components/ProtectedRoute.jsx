import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser, canAccessRoute } from '../utils/roleUtils';

const ProtectedRoute = ({ children, requiredRole }) => {
  const location = useLocation();
  const user = getCurrentUser();
  
  // Debug logging
  console.log('ProtectedRoute - User:', user);
  console.log('ProtectedRoute - Required Role:', requiredRole);
  console.log('ProtectedRoute - Location:', location.pathname);
  
  // For testing purposes, allow access to dashboard routes
  if (location.pathname === '/dashboard') {
    console.log('Allowing dashboard access for testing');
    return children;
  }
  
  // Check if user is authenticated
  if (!user || !user.id) {
    console.log('User not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  // Check if specific role is required
  if (requiredRole && user.role !== requiredRole) {
    console.log('User role does not match required role, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  // Check if user can access this route
  if (!canAccessRoute(location.pathname)) {
    console.log('User cannot access this route, redirecting to login');
    return <Navigate to="/login" replace />;
  }
  
  console.log('User authenticated and authorized, rendering children');
  return children;
};

export default ProtectedRoute;
