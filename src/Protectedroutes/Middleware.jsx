import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../Utilis/Loader';
import { UserState } from '../Context/Usercontext';

const Middleware = ({ children }) => {
  const { user, loading } = UserState();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsInitialized(true);
    }
  }, [loading]);

  if (!isInitialized) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }


  if (user?.is_admin === 1) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default Middleware;
