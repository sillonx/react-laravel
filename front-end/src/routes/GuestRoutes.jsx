import { Outlet } from 'react-router-dom';

import RequireNotAuth from './components/RequireNotAuth';

import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';


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