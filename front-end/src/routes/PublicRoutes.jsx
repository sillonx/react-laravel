import { Outlet } from 'react-router-dom';

import Home from '../pages/Home';
import Error401 from '../pages/errors/401';
import Error404 from '../pages/errors/404';


const PublicRoutes = {
    path: '/',
    element: <Outlet />,
    children: [
        {
            path: '/',
            element: <Home />
        },
        {
            path: 'unauthorized' ,
            element: <Error401 />
        },
        {
            path: '*',
            element: <Error404 />
        }
    ]
};

export default PublicRoutes;