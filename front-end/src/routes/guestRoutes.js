import { Outlet } from 'react-router-dom';

import RequireNotAuth from './middlewares/RequireNotAuth';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';


export const GUEST_ROUTES = [
    'login',
    'register'
]

const GuestRoutes = {
    path: '/',
    element: <Outlet />,
    children: [
        {
            element: <RequireNotAuth />,
            children: [
                {
                    path: GUEST_ROUTES[0],
                    element: <Login />
                },
                {
                    path: GUEST_ROUTES[1],
                    element: <Register />
                }
            ]
        }
    ]
};

export default GuestRoutes;