import React from 'react';
import { Navigate } from 'react-router-dom'; // Use Navigate for redirects in React Router v6

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check for token in localStorage

  // If authenticated, render the children (protected components); otherwise, redirect to login page
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default PrivateRoute;
