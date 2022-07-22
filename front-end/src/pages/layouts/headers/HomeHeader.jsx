import { useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';

import { useCookies } from 'react-cookie';

import { isLogged } from '../../../api/utils';

import { 
    Grid,
    Button,
    Typography,
    Avatar,
    Stack,
    Snackbar,
    Alert
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import myLogo from '../../../static/images/logo.png';


export default function HomeHeader () {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const auth = cookies.user;

    const location = useLocation();
    const navigate = useNavigate();

    const Profile = () => {
        navigate('/profile', { from: location, replace: false });
    }

    const Login = () => {
        navigate('/login', { from: location, replace: false });
    }

    const Logout = () => {
        try {
            removeCookie('user', {path:'/'});
            setOpen(true);
            setMessage('Logged out successfully');
        } catch (err) {
            setOpen(false);
            setMessage('Error during logout');
        }
    }
  
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' p={3}  spacing={0} sx={{ position:'static', bottom:0, display:'flex', backgroundColor:'primary.main' }}>
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} justifyContent='flex-start' alignItems='center' sx={{ display:'flex' }}>
                <Avatar src={myLogo} sx={{ width: 100, height: 100 }}/>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} justifyContent='center' alignItems='center' sx={{ display:'flex' }}>
                <Typography variant='h3' sx={{ color:'common.white', fontWeight:'bold' }}>
                    Accueil
                </Typography>
            </Grid>

            {isLogged(auth?.role) 
            ? <Grid item xs={3} sm={3} md={3} lg={3} xl={3} justifyContent='flex-end' alignItems='center' sx={{ display:'flex' }}>
                <Stack direction='row' spacing={2}>
                    <Button onClick={Profile} variant='contained' size='large' endIcon={<PersonIcon />} sx={{ boxShadow: 5, color:'primary.main', backgroundColor:'common.white', '&:hover': { color:'common.white', backgroundColor:'primary.main', boxShadow: 10 } }}>
                        Profile
                    </Button>
                    <Button onClick={Logout} variant='contained' size='large' endIcon={<LogoutIcon />} sx={{ boxShadow: 5, color:'primary.main', backgroundColor:'common.white', '&:hover': { color:'common.white', backgroundColor:'error.main', boxShadow: 10 } }}>
                        Logout
                    </Button>
                </Stack>
            </Grid>
            : <Grid item xs={3} sm={3} md={3} lg={3} xl={3} justifyContent='flex-end' alignItems='center' sx={{ display:'flex' }}>
                <Button onClick={Login} variant='contained' size='large' endIcon={<LoginIcon />} sx={{ boxShadow: 5, color:'primary.main', backgroundColor:'common.white', '&:hover': { color:'common.white', backgroundColor:'success.main', boxShadow: 10 } }}>
                    Login
                </Button>
            </Grid>
            }
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity='info' sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Grid>
    )
}