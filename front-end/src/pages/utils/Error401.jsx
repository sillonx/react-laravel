import { useLocation, useNavigate } from 'react-router-dom';

import { 
    Typography,
    Button,
    Grid
} from '@mui/material';


export default function Error401 () {

    const location = useLocation();
    const navigate = useNavigate();

    const returnHome = () => {
        navigate('/', { from: location, replace: false });
    }

    return (
        <Grid container direction='column' justifyContent='center' alignItems='center' py='20%' spacing={2} sx={{ display:'flex' }}>
            <Grid item justifyContent='center' alignItems='center' p={3} sx={{ display:'flex' }}>
                <Typography variant='h5'>You're not allowed to go here</Typography>
            </Grid>
            <Grid item justifyContent='center' alignItems='center' p={3} sx={{ display:'flex' }}>
                <Button variant='contained' size='large' onClick={returnHome} sx={{ '&:hover': { backgroundColor:'primary.main', bowShadow:15 } }}>
                    Return home
                </Button>
            </Grid>
        </Grid>
    )
}