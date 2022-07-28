import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import axios from './api/axios';

import { login } from './store/reducers/auth';

import CssBaseline from '@mui/material/CssBaseline';

import { ThemeProvider } from '@mui/material/styles';

import { useCookies } from 'react-cookie'

import MyRoutes from './routes/index';

import LightTheme from './themes/light';
import DarkTheme from './themes/dark';

export default function App() {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [cookies] = useCookies(['mode']);

    useEffect( () => {
        axios.post('auth/verify', {}, {withCredentials:true})
        .then( (res) => {
            const name = res?.data?.user?.name;
            const email = res?.data?.user?.email;
            const created_at = res?.data?.user?.created_at;
            const permissions = res?.data?.permissions;
            const resAPI = { name, email, created_at, permissions };
            dispatch(login({ resAPI }));
            setLoading(false);
        })
        .catch( (function (error) {
            console.log('ici')
            setLoading(false);
        }));
    }, [setLoading]);

    return (
        <ThemeProvider theme={cookies.mode === 'dark' ? DarkTheme : LightTheme}>
            <CssBaseline/>  
            {loading ? <div>Loading</div> : <MyRoutes/>}   
        </ThemeProvider>
    );
}