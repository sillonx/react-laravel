import Headers from '../layouts/headers';
import Footers from '../layouts/footers';
import Navbar from '../layouts/Navbar';

import { 
    Typography 
} from '@mui/material';


export default function PrivacyPolicy() {

    return (
        <>
            <Headers />
            <Navbar />
            <Typography variant='h4'>
                Privacy Policy
            </Typography>
            <Footers />
        </>
    )
}