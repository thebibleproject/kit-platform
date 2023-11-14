import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { useUser } from '../providers/Auth';

export const Root = () => {
    const user = useUser();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <div>
            <Navigation />
            <Outlet />
            <Footer />
        </div>
    );
};
