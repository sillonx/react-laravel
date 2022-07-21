import useAuth from '../../hooks/useAuth';

const Logout = async () => {
    const { setAuth } = useAuth();
    setAuth('');
}

export default Logout;