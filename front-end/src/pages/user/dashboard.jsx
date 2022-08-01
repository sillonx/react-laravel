import { useSelector } from 'react-redux';

import Headers from '../layouts/headers';
import Footers from '../layouts/footers';
import Navbar from '../layouts/Navbar';

import { 
    Typography 
} from '@mui/material';


export default function Dashboard() {

    const user = useSelector( (state) => state.auth);
    
    return (
        <>
            <Headers />
            <Navbar />
            <Typography variant='h5' sx={{ height:500 }}>Welcome to the dashboard page {user?.name}</Typography>
            <Footers />
        </>
    )
}