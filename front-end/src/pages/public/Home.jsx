import { useSelector } from 'react-redux';

import Headers from '../layouts/headers';
import Footers from '../layouts/footers';
import Navbar from '../layouts/Navbar';

import { 
    Typography 
} from '@mui/material';


export default function Home() {

    const user = useSelector( (state) => state.auth);
    
    return (
        <>
            <Headers />
            <Navbar />
            <Typography variant='h3'>
                React-Laravel API Authentication
            </Typography>
            {user.status 
            ?
                <Typography variant='h6' sx={{ height:500 }}>You're logged in as {user?.name}</Typography>
            :
                <Typography variant='h6' sx={{ height:500 }}>You're not logged in</Typography>
            }
            <Footers />
        </>
    )
}