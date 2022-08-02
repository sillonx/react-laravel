import { useState, useEffect } from 'react';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { LoginAPI } from '../../services/AuthServices';

import { login } from '../../store/reducers/Auth';

import Headers from '../layouts/headers';

import { 
    Typography,
    Grid,
    Stack,
    Button,
    OutlinedInput,
    InputAdornment,
    InputLabel,
    IconButton,
    FormControl,
    FormHelperText, 
    Checkbox 
} from '@mui/material';

import { styled } from '@mui/material/styles';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const MyLink = styled(Link)(({ theme }) => ({
    color: theme.palette.link.main,
    '&:visited':{
        color: theme.palette.link.visited
    }
}));

export default function Login() {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useDispatch();

    useEffect( () => {
        setErrorMessage('');
    }, [email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        const loginUser = {
            email : email,
            password : password,
            remember : rememberMe    
        };
        try {
            const resAPI = await LoginAPI(loginUser);
            dispatch(login({ resAPI }));
            navigate(from, { replace: true });
        } 
        catch (err) {
            setErrorMessage('Login failed');
            setPassword('');
        }
    }

    
    return (
        <>
            <Headers />
            <Grid container direction='column' justifyContent='center' alignItems='center' py='5%' sx={{ display:'flex' }}>
                <Grid item justifyContent='center' alignItems='center' sx={{ display:'flex' }}>
                    <Stack direction='column' spacing={2} p={2}>
                        <Typography variant='h3'>Login</Typography>
                        <Typography variant='h5' color='error'>{errorMessage ? errorMessage : ''}</Typography>
                    </Stack>
                </Grid>

                <Grid item justifyContent='center' alignItems='center' sx={{ display:'flex' }}>
                    <form onSubmit={handleSubmit}>
                        <Stack direction='column' spacing={3} p={2} justifyContent='center' alignItems='center'>
                            <FormControl sx={{ width:250 }}>
                                <InputLabel>Email</InputLabel>
                                <OutlinedInput
                                    type='email'
                                    value={email}
                                    required
                                    autoComplete='on'
                                    onChange={(e) => setEmail(e.target.value)}
                                    label='Email' />
                                    <FormHelperText></FormHelperText>
                            </FormControl>

                            <FormControl sx={{ width:250 }}>
                                <InputLabel>Password</InputLabel>
                                <OutlinedInput
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    required
                                    autoComplete='on'
                                    onChange={(e) => setPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge='end' >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment> }
                                    label='Password' />
                                    <FormHelperText></FormHelperText>
                            </FormControl>

                            <Stack direction='row' justifyContent='center' alignItems='center'>
                                <Typography variant='subtitle1'>Remember me ?</Typography>
                                <Checkbox checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
                            </Stack>

                            <Button variant='contained' type='submit' size='large'>
                                Sign In
                            </Button>
                        </Stack>
                    </form>
                </Grid>

                <Grid item justifyContent='center' alignItems='center' sx={{ display:'flex' }}>
                    <MyLink to='/register'>Create an account</MyLink>
                </Grid>
            </Grid>
        </>
    )
}