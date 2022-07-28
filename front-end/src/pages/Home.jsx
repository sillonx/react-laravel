import { useSelector, useDispatch } from 'react-redux';

import { login, logout } from '../store/reducers/auth';

import { HandleLogout } from '../services/authServices';

import Headers from './layouts/headers';
import Footers from './layouts/footers';

import { 
    Typography 
} from '@mui/material';


export default function Home() {
    const dispatch = useDispatch();
    const user = useSelector( (state) => state.auth);
    var resAPI = { name:"f", email:"k", created_at:"a", permissions:["dode"]}
    const Click = () => {
        dispatch(login({resAPI}));
    }
    
    return (
        <>
            <Headers />
            <Typography>This is Home {console.log(user)}</Typography>
            <button onClick={Click}>test</button>
            <Footers />
        </>
    )
}