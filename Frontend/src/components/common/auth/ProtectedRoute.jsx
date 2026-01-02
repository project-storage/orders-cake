import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();

  // Check if user is authenticated and has an allowed role
  const isAuthenticated = user && user.role;
  const hasAccess = isAuthenticated && allowedRoles.includes(user.role);

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!hasAccess) {
    // Redirect to a "not authorized" page or home if user doesn't have required role
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;