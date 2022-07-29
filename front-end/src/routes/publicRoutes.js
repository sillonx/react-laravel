import { Outlet } from 'react-router-dom';

import Home from '../pages/public/Home';
import Settings from '../pages/public/Settings';
import Error401 from '../pages/errors/401';
import Error404 from '../pages/errors/404';


export const PUBLIC_ROUTES = [
    '/',
    'settings',
    'unauthorized',
    '*'
]

const PublicRoutes = {
    path: '/',
    element: <Outlet />,
    children: [
        {
            path: PUBLIC_ROUTES[0],
            element: <Home />
        },
        {
            path: PUBLIC_ROUTES[1],
            element: <Settings />
        },
        {
            path: PUBLIC_ROUTES[2] ,
            element: <Error401 />
        },
        {
            path: PUBLIC_ROUTES[3],
            element: <Error404 />
        }
    ]
};

export default PublicRoutes;