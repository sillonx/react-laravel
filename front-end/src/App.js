import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import axios from './api/Axios';

import { login } from './store/reducers/Auth';

import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider } from '@mui/material/styles';

import { useCookies } from 'react-cookie'

import MyRoutes from './routes';
import Loading from './pages/utils/Loading';

import LightTheme from './themes/Light';
import DarkTheme from './themes/Dark';

export default function App() {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [cookies] = useCookies(['mode']);

    useEffect( () => {
        axios.post('auth/verify-token', {}, {withCredentials:true})
        .then( (res) => {
            if (res?.data?.status === 200) {
                const name = res?.data?.user?.name;
                const email = res?.data?.user?.email;
                const created_at = res?.data?.user?.created_at;
                const permissions = res?.data?.permissions;
                const resAPI = { name, email, created_at, permissions };
                dispatch(login({ resAPI }));
            }
            setLoading(false);
        })
        .catch(function (error) {
            setLoading(false);
        });
    }, []);

    return (
        <ThemeProvider theme={cookies?.mode === 'dark' ? DarkTheme : LightTheme}>
            <CssBaseline/>  
            {loading ? <Loading /> : <MyRoutes />}   
        </ThemeProvider>
    );
}