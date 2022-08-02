import { Outlet } from 'react-router-dom';

import RequireAuth from './middlewares/RequireAuth';

import Dashboard from '../pages/user/Dashboard';
import Profile from '../pages/user/Profile';


export const AUTH_ROUTES = [
    'profile',
    'dashboard'
]

const AuthRoutes = {
    path: '/',
    element: <Outlet />,
    children: [
        {
            element: <RequireAuth permission={'Profile'} />,
            children: [
                {
                    path: AUTH_ROUTES[0],
                    element: <Profile />
                }
            ]
        },
        {
            element: <RequireAuth permission={'Dashboard'} />,
            children: [
                {
                    path: AUTH_ROUTES[1],
                    element: <Dashboard />
                }
            ]
        }
    ]
};

export default AuthRoutes;