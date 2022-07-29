import Headers from '../layouts/headers';
import Footers from '../layouts/footers';
import Navbar from '../layouts/Navbar';

import { 
    Typography 
} from '@mui/material';


export default function Profile() {
    
    return (
        <>
            <Headers />
            <Navbar />
            <Typography>Welcome to the profile page</Typography>
            <Footers />
        </>
    )
}