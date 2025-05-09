import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Loader from '../Utilis/Loader';
import { UserState } from '../Context/Usercontext';

const Middleware = () => {

  const { user, loading } = UserState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const role = Number(user.is_role);

    const currentPath = location.pathname;

    // Prevent redirect loop
    if (role === 0 && !currentPath.startsWith('/admin')) {
      navigate('/admin', { replace: true });
    } else if (role === 1 && !currentPath.startsWith('/hr')) {
      navigate('/hr', { replace: true });
    }
    // Add more roles as needed
  }, [user]);

  return null;
};

export default Middleware;
