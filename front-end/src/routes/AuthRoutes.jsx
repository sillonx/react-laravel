import { Outlet } from 'react-router-dom';

import { findPublic } from '../api/utils';

import RequireAuth from '../components/RequireAuth';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';


const AuthRoutes = {
    path: '/',
    element: <Outlet />,
    children: [
        {
            element: <RequireAuth allowedRoles={findPublic(['User','Admin'])} />,
            children: [
                {
                    path: 'profile',
                    element: <Profile />
                }
            ]
        },
        {
            element: <RequireAuth allowedRoles={findPublic(['Admin'])} />,
            children: [
                {
                    path: 'dashboard',
                    element: <Dashboard />
                }
            ]
        }
    ]
};

export default AuthRoutes;