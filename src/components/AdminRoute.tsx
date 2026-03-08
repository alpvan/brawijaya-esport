import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import Loader from '../../components/Loader';

export const AdminRoute = () => {
    const { user, loading } = useAuthStore();

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-black">
                <Loader />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/alvan/login" replace />;
    }

    return <Outlet />;
};
