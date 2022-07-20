import { useState, useEffect } from 'react';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

import axios from '../../api/axios';

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
FormHelperText } from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export default function Login () {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect( () => {
        setErrorMessage('');
    }, [email, password]);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loginUser = {
            email : email,
            password : password    
        };
        try {
            axios.post('login', loginUser, {headers: { 'Content-Type': 'application/json'}}).then( (res) => {
                const accessToken = res?.data?.accessToken;
                setAuth({ email, password, accessToken });
                navigate(from, { replace: true });
            });
        } catch (err) {
            setErrorMessage('Login Failed');
            setPassword('');
        }
    }

    
    return (
        <Grid container direction='column' justifyContent='center' alignItems='center' p={10} sx={{ display:'flex' }}>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} justifyContent='center' alignItems='center' sx={{ display:'flex' }}>
                <Stack direction='column' spacing={2} p={2}>
                    <Typography variant='h3'>Login</Typography>
                    <Typography variant='h5' color='error'>{errorMessage ? errorMessage : ''}</Typography>
                </Stack>
            </Grid>

            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} justifyContent='center' alignItems='center' sx={{ display:'flex' }}>
                <form onSubmit={handleSubmit}>
                    <Stack direction='column' spacing={3} p={2} justifyContent='center' alignItems='center'>
                        <FormControl>
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

                        <FormControl>
                            <InputLabel>Password</InputLabel>
                            <OutlinedInput
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                required
                                autoComplete='off'
                                onChange={(e) => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position='end'>
                                        <IconButton
                                        onClick={handleClickShowPassword}
                                        edge='end' >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment> }
                                label='Password' />
                                <FormHelperText></FormHelperText>
                        </FormControl>

                        <Button variant='contained' type='submit' size='large'>
                            Sign In
                        </Button>
                    </Stack>
                </form>
            </Grid>

            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} justifyContent='center' alignItems='center' sx={{ display:'flex' }}>
                <Link to='/register'>Create an account</Link>
            </Grid>
        </Grid>
    )
}