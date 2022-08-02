import Headers from '../layouts/headers';
import Footers from '../layouts/footers';
import Navbar from '../layouts/Navbar';

import { 
    Typography 
} from '@mui/material';


export default function TermsOfService() {
   
    return (
        <>
            <Headers />
            <Navbar />
            <Typography variant='h4'>
                Terms of Service
            </Typography>
            <Footers />
        </>
    )
}