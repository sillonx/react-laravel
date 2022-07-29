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
            {user.status 
            ?
                <Typography sx={{ height:500 }}>Welcome to the home page {user?.name}</Typography>
            :
                <Typography sx={{ height:500 }}>Welcome to the home page</Typography>
            }
            <Footers />
        </>
    )
}