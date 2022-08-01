import { useSelector } from 'react-redux';

import { useCookies } from 'react-cookie';

import Headers from '../layouts/headers';
import Footers from '../layouts/footers';
import Navbar from '../layouts/Navbar';

import { 
    Typography,
    Stack,
    Button
} from '@mui/material';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';


export default function Settings() {

    const user = useSelector( (state) => state.auth);
    const [cookies, setCookie, removeCookie] = useCookies(['mode']);

    const handleChangeMode = () => {
      const newMode = (cookies?.mode === 'dark' ? 'light' : 'dark');
      newMode === 'dark' ? setCookie('mode', newMode, {path:'/', maxAge:3153600000}) : removeCookie('mode', {path:'/'});
    };
    
    return (
        <>
            <Headers />
            <Navbar />
            <Typography variant='h5'>Welcome to the settings page {user?.name}</Typography>
            <Stack direction='row' p={2} spacing={1} alignItems='center' justifyContent='flex-start'>
                <Typography>
                    App theme :
                </Typography>
                <Button variant='contained' size='large' onClick={handleChangeMode} endIcon={cookies.mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />} sx={{ '&:hover': { backgroundColor:'primary.main', bowShadow:15 } }}>
                    {cookies.mode === 'dark' ? 'Dark' : 'Light'}
                </Button>
            </Stack>
            <Footers />
        </>
    )
}