import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { useCookies } from 'react-cookie';


const RequireNotAuth = () => {
    const location = useLocation();
    const [cookies] = useCookies(['user']);
    const role = cookies?.user?.role;

    return (
        role
            ? <Navigate to='/' state={{ from: location }} replace />
            : <Outlet />
    )
}

export default RequireNotAuth;