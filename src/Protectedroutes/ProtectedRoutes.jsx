import React, { useEffect, useState } from 'react';
import { UserState } from '../Context/Usercontext';
import Loader from '../Utilis/Loader';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children, allowedRoles }) => {
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


    // if (allowedRoles?.includes(user?.is_role) || user) {
    //     return <Navigate to={user?.is_role == 0 ? '/admin' : user?.is_role == 1 && '/hr'} replace />
    // } else
     if (!allowedRoles?.includes(user?.is_role) || !user) {
        return <Navigate to="/login" replace />
    }


    return children;
};

export default ProtectedRoutes;
