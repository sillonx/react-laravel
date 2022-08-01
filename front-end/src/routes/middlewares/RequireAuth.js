import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { useSelector } from 'react-redux';


const RequireAuth = ({ permission }) => {
    const location = useLocation();
    const user = useSelector( (state) => state.auth);

    return (
        user?.permissions.includes(permission)
            ? <Outlet />
            : user?.status
                ? <Navigate to='/unauthorized' state={{ from: location }} replace />
                : <Navigate to='/login' state={{ from: location }} replace />
    )
}

export default RequireAuth;