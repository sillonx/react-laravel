import { useLocation, useNavigate } from 'react-router-dom';

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

import { styled } from '@mui/material/styles';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PreviewIcon from '@mui/icons-material/Preview';


const MyButton = styled(Button)(({ theme }) => ({
    color:theme.palette.common.white,
    fontWeight:'bold'
}));

export default function Settings() {

    const location = useLocation();
    const navigate = useNavigate();

    const user = useSelector( (state) => state.auth);
    const [cookies, setCookie, removeCookie] = useCookies(['mode']);

    const handleChangeMode = () => {
      const newMode = (cookies?.mode === 'dark' ? 'light' : 'dark');
      newMode === 'dark' ? setCookie('mode', newMode, {path:'/', maxAge:3153600000}) : removeCookie('mode', {path:'/'});
    };

    const handleTermsOfService = () => {
        navigate('/terms_of_service', { from: location, replace: false });
    }

    const handlePrivacyPolicy = () => {
        navigate('/privacy_policy', { from: location, replace: false });
    }
    
    return (
        <>
            <Headers />
            <Navbar />
            <Typography variant='h5'>Welcome to the settings page {user?.name}</Typography>
            <Stack direction='row' p={2} spacing={1} alignItems='center' justifyContent='flex-start'>
                <Typography>
                    App theme
                </Typography>
                <MyButton variant='contained' onClick={handleChangeMode} endIcon={cookies.mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}>
                    {cookies.mode === 'dark' ? 'Dark' : 'Light'}
                </MyButton>
            </Stack>

            <Stack direction='row' p={2} spacing={1} alignItems='center' justifyContent='flex-start'>
                <Typography> 
                    Terms of Service
                </Typography>
                <MyButton variant='contained' onClick={handleTermsOfService} endIcon={<PreviewIcon />}>
                    Preview
                </MyButton>
            </Stack>

            <Stack direction='row' p={2} spacing={1} alignItems='center' justifyContent='flex-start'>
                <Typography> 
                    Privacy Policy
                </Typography>
                <MyButton variant='contained' onClick={handlePrivacyPolicy} endIcon={<PreviewIcon />}>
                    Preview
                </MyButton>
            </Stack>
            <Footers />
        </>
    )
}