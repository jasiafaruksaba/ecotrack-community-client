import React from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner'; // You need to create this
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Global spinner while checking auth status
    return <Spinner />;
  }

  if (user) {
    // Logged in user must not be redirected to Login on reloading any private route
    return children;
  }

  // Redirect to login, storing the current path for post-login navigation
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;