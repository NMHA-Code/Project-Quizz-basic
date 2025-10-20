// auth/publicRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/auth';

const PublicRoute = ({ children }) => {
    const {token} = useAuth();
//   const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to="/Homes" replace />;
  }
  return children;
};

export default PublicRoute;
