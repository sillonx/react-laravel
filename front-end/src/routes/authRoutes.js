import { Outlet } from 'react-router-dom';

import RequireAuth from './middleware/requireAuth';

import Dashboard from '../pages/user/dashboard';
import Profile from '../pages/user/profile';


const AuthRoutes = {
    path: '/',
    element: <Outlet />,
    children: [
        {
            element: <RequireAuth permission={'user'} />,
            children: [
                {
                    path: 'profile',
                    element: <Profile />
                }
            ]
        },
        {
            element: <RequireAuth permission={'admin'} />,
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