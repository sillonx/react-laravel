import { Outlet } from 'react-router-dom';

import RequireNotAuth from './middleware/requireNotAuth';

import Login from '../pages/auth/login';
import Register from '../pages/auth/register';


const GuestRoutes = {
    path: '/',
    element: <Outlet />,
    children: [
        {
            element: <RequireNotAuth />,
            children: [
                {
                    path: 'login',
                    element: <Login />
                },
                {
                    path: 'register',
                    element: <Register />
                }
            ]
        }
    ]
};

export default GuestRoutes;