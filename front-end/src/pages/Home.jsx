import { useSelector } from 'react-redux';

import { 
    Typography 
} from '@mui/material';

export default function Home() {
    const user = useSelector( (state) => state.auth);
    return (
        <Typography>This is Home {console.log(user)}</Typography>
    )
}