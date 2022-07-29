import Headers from '../layouts/headers';
import Footers from '../layouts/footers';
import Navbar from '../layouts/Navbar';

import { 
    Typography 
} from '@mui/material';


export default function Settings() {
    
    return (
        <>
            <Headers />
            <Navbar />
            <Typography>Welcome to the settings page</Typography>
            <Footers />
        </>
    )
}