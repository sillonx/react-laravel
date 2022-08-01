import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { useLocation, useNavigate } from 'react-router-dom';

import { LogoutAPI } from '../../services/AuthServices';

import { logout } from '../../store/reducers/Auth';

import { PUBLIC_ROUTES } from '../../routes/PublicRoutes';

import { 
    Grid,
    Button,
    Typography,
    Snackbar,
    Alert,
    Stack,
    Menu,
    MenuItem,
    AppBar,
    Container,
    Toolbar
} from '@mui/material';

import { styled } from '@mui/material/styles';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';


const MyMenuItem = styled(MenuItem)(({ theme }) => ({
    fullwidth:'true',
    '&:hover':{
        color: theme.palette.primary.main,
        backgroundColor: 'rgba(0,0,0,0)'
    }
}));
const MyButton = styled(Button)(({ theme }) => ({
    color:theme.palette.common.white,
    fontWeight:'bold',
    '&:hover':{
        textDecoration: 'underline'
    }
}));

export default function Navbar() {

    const [anchorMenu, setAnchorMenu] = useState(null);
    const openMenu = Boolean(anchorMenu);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState('');
    const [logoutSuccess, setLogoutSuccess] = useState(false);

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

    const handleRegister = () => {
        navigate('/register', { from: location, replace: false });
    }

    const handleLogout = async () => {
        try {
            await LogoutAPI();
            dispatch(logout({}));
            if ((location.pathname.length > 1 && PUBLIC_ROUTES.includes(location.pathname.slice(1))) || PUBLIC_ROUTES.includes(location.pathname)) {
                setOpenSnackbar(true);
                setLogoutSuccess(true);
                setMessage('Logged out successfully');
            }
            else {
                navigate('/', { from: location, replace: false });
            }
        } catch (err) {
            setOpenSnackbar(true);
            setLogoutSuccess(false);
            setMessage('Error during logout');
        }
    }

    const handleHome = () => {
        navigate('/', { from: location, replace: false });
    }

    const handleSettings = () => {
        navigate('/settings', { from: location, replace: false });
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
        <AppBar position='sticky' sx={{ backgroundColor:'primary.main' }}>
            <Container maxWidth='x1'>
                <Toolbar disableGutters>
                    <Grid container direction='row' justifyContent='space-between' alignItems='center' p={1} sx={{ position:'static', bottom:0, display:'flex' }}>
                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} justifyContent='flex-start' alignItems='center' sx={{ display:'flex' }}>
                            <Stack direction='row' spacing={4}>
                                <MyButton onClick={handleHome} size='large' startIcon={<HomeIcon />}>
                                    Home
                                </MyButton>
                                
                                {user?.permissions.includes('Profile') &&
                                <MyButton onClick={handleProfile} size='large' startIcon={<PersonIcon />}>
                                    Profile
                                </MyButton>}

                                {user?.permissions.includes('Dashboard') &&
                                <MyButton onClick={handleDashboard} size='large' startIcon={<DisplaySettingsIcon />}>
                                    Dashboard
                                </MyButton>}
                            </Stack>
                        </Grid>

                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} justifyContent='flex-end' alignItems='center' sx={{ display:'flex' }}>
                            <Button onClick={handleClickMenu} size='large' endIcon={<MenuIcon />} sx={{ color:'common.white', fontWeight:'bold' }}>
                                Menu
                            </Button>

                            <Menu open={openMenu} onClose={handleCloseMenu} anchorEl={anchorMenu}>
                                <MyMenuItem onClick={handleSettings}>
                                    <Stack direction='row' spacing={1}>
                                        <SettingsIcon />
                                        <Typography sx={{ fontWeight:'bold' }}>Settings</Typography>
                                    </Stack>
                                </MyMenuItem>

                                {!user?.status &&
                                <MyMenuItem onClick={handleLogin}>
                                    <Stack direction='row' spacing={1}>
                                        <LoginIcon />
                                        <Typography sx={{ fontWeight:'bold' }}>Login</Typography>
                                    </Stack>
                                </MyMenuItem> }

                                {!user?.status &&
                                <MyMenuItem onClick={handleRegister}>
                                    <Stack direction='row' spacing={1}>
                                        <PersonAddIcon />
                                        <Typography sx={{ fontWeight:'bold' }}>Register</Typography>
                                    </Stack>
                                </MyMenuItem> }

                                
                                {user?.status &&
                                <MyMenuItem onClick={handleLogout}>
                                <Stack direction='row' spacing={1}>
                                        <LogoutIcon />
                                        <Typography sx={{ fontWeight:'bold' }}>Logout</Typography>
                                    </Stack>
                                </MyMenuItem> }
                            </Menu>
                        </Grid>
                    </Grid>
                    <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                        <Alert onClose={handleCloseSnackbar} severity={logoutSuccess ? 'info' : 'warning'} sx={{ width: '100%' }}>
                            {message}
                        </Alert>
                    </Snackbar>
                </Toolbar>
            </Container>
        </AppBar>
    )
            
}