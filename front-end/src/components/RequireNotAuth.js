import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { useCookies } from 'react-cookie';

import { isLogged } from '../api/utils';


const RequireNotAuth = () => {
    const location = useLocation();
    const [cookies] = useCookies(['user']);
    const role = cookies?.user?.role;

    return (
      isLogged(role)
        ? <Navigate to='/' state={{ from: location }} replace />
        : <Outlet />
    )
}

export default RequireNotAuth;