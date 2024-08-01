// ProtectedAdminRoute.js
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {jwtDecode} from 'jwt-decode';

const ProtectedAdminRoute = ({ children, isAdminRoute }) => {
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const token = localStorage.getItem('token');
  let role = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.role;
    } catch (error) {
      toast.error("Invalid token");
      localStorage.clear();
    }
  }

  useEffect(() => {
    if (!token && !isTokenChecked) {
      localStorage.clear();
      toast.warning("An error has occurred");
      setIsTokenChecked(true);
    }
  }, [token, isTokenChecked]);

  if (!token) {
    return <Navigate to="/" />;
  }

  if (isAdminRoute && role != 'admin') {
    toast.error("Unauthorized access");
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedAdminRoute;
