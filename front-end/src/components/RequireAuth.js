import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { useCookies } from 'react-cookie';


const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation();
    const [cookies] = useCookies(['user']);
    const role = cookies?.user?.role;

    return (
        allowedRoles?.includes(role)
            ? <Outlet />
            : role === 118
                ? <Navigate to='/unauthorized' state={{ from: location }} replace />
                : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default RequireAuth;