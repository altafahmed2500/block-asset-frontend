import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    // Check if the access token exists in localStorage
    const isAuthenticated = !!localStorage.getItem('access_token');

    return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;