import { Outlet } from 'react-router-dom';

import Home from '../pages/public/Home';
import Settings from '../pages/public/Settings';
import TermsOfService from '../pages/public/TermsOfService';
import PrivacyPolicy from '../pages/public/PrivacyPolicy';
import Error401 from '../pages/utils/Error401';
import Error404 from '../pages/utils/Error404';


export const PUBLIC_ROUTES = [
    '/',
    'settings',
    'terms_of_service',
    'privacy_policy',
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
            path: PUBLIC_ROUTES[2],
            element: <TermsOfService />
        },
        {
            path: PUBLIC_ROUTES[3],
            element: <PrivacyPolicy />
        },
        {
            path: PUBLIC_ROUTES[4] ,
            element: <Error401 />
        },
        {
            path: PUBLIC_ROUTES[5],
            element: <Error404 />
        }
    ]
};

export default PublicRoutes;