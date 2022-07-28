import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useLocation, useNavigate } from 'react-router-dom';

import { HandleLogout } from '../../../services/authServices';

import { logout } from '../../../store/reducers/auth'; 

import { 
    Grid,
    Button,
    Typography,
    Avatar,
    Snackbar,
    Alert,
    IconButton,
    MenuItem,
    Menu
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import ShieldIcon from '@mui/icons-material/Shield';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import myLogo from '../../../static/images/logo.png';


export default function HomeHeader () {

    const [anchorMenu, setAnchorMenu] = useState(null);
    const openMenu = Boolean(anchorMenu);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');


    const location = useLocation();
    const navigate = useNavigate();

    const user = useSelector( (state) => state.auth);
    const dispatch = useDispatch();

    const handleProfile = () => {
        navigate('/profile', { from: location, replace: false });
    }

    const handleDashboard = () => {
        navigate('/dashboard', { from: location, replace: false });
    }

    const handleLogin = () => {
        navigate('/login', { from: location, replace: false });
    }

    const handleLogout = async () => {
        try {
            const resAPI = await HandleLogout();
            dispatch(logout({}));
            setMessage(resAPI);
        } catch (err) {
            setMessage('Error during logout');
        }
    }
  
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    const handleClickMenu = (e) => {
        setAnchorMenu(e.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorMenu(null);
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

            
            <Grid item xs={3} sm={3} md={3} lg={3} xl={3} justifyContent='flex-end' alignItems='center' sx={{ display:'flex' }}>
                <IconButton onClick={handleClickMenu} size='large' sx={{ color:'common.white' }}>
                    <MenuIcon />
                </IconButton>
                <Menu open={openMenu} onClose={handleCloseMenu} anchorEl={anchorMenu}>
                    {user?.status &&
                    <MenuItem onClick={handleProfile} fullwidth='true'>
                        <Grid container direction='row' justifyContent='center' alignItems='center' spacing={1} sx={{ display:'flex' }}>
                            <Grid item justifyContent='center' alignItems='center' sx={{ display:'flex' }}>
                                <PersonIcon />
                            </Grid>
                            <Grid item justifyContent='center' alignItems='center' sx={{ display:'flex' }}>
                                <Typography>Profile</Typography>
                            </Grid>
                        </Grid>
                    </MenuItem> }
                    {user?.permissions.includes('admin') &&
                    <MenuItem>
                        <Button onClick={handleDashboard} fullwidth='true' variant='outlined' size='large' endIcon={<ShieldIcon />} sx={{ boxShadow: 5, color:'primary.main', backgroundColor:'common.white', '&:hover': { color:'common.white', backgroundColor:'primary.main', boxShadow: 10 } }}>
                            Dashboard
                        </Button>
                    </MenuItem> }
                    {user?.status &&
                    <MenuItem>
                        <Button onClick={handleLogout} fullwidth='true' variant='outlined' size='large' endIcon={<LogoutIcon />} sx={{ boxShadow: 5, color:'primary.main', backgroundColor:'common.white', '&:hover': { color:'common.white', backgroundColor:'error.main', boxShadow: 10 } }}>
                            Logout
                        </Button>
                    </MenuItem> }
                    {!user?.status &&
                    <MenuItem>
                        <Button onClick={handleLogin} fullwidth='true' variant='outlined' size='large' endIcon={<LoginIcon />} sx={{ boxShadow: 5, color:'primary.main', backgroundColor:'common.white', '&:hover': { color:'common.white', backgroundColor:'success.main', boxShadow: 10 } }}>
                            Login
                        </Button>
                    </MenuItem> }
                </Menu>
            </Grid>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity='info' sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Grid>
    )
}