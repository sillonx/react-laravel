import { useLocation, useNavigate } from 'react-router-dom';

import { 
    Grid,
    Button
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';


export default function LoginHeader () {

    const location = useLocation();
    const navigate = useNavigate();

    const Home = () => {
        navigate('/', { from: location, replace: false });
    }


    return (
        <Grid container direction='row' justifyContent='space-between' alignItems='center' p={3}  spacing={0} sx={{ position:'static', bottom:0, display:'flex' }}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} justifyContent='flex-end' alignItems='center' sx={{ display:'flex' }}>
                <Button onClick={Home} variant='outlined' size='large' endIcon={<HomeIcon />}>
                    Home
                </Button>
            </Grid>
        </Grid>   
    )
}