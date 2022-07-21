import { useState, useEffect } from 'react';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useCookies } from 'react-cookie';

import HandleRegister from '../../services/registerService';

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
Select,
MenuItem } from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HandleLogin from '../../services/loginService';

const NAME_REGEX = /^[a-zA-Z][a-z-A-Z0-9-_]{3,24}$/;
const EMAIL_REGEX = /^[a-zA-Z][a-zA-Z0-9.-_]+@[a-zA-Z]+\.([a-zA-Z])+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%-_]).{8,24}$/;


export default function Register () {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [cookies, setCookie] = useCookies(['user']);

    const [role, setRole] = useState('user');

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const [match, setMatch] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showMatch, setShowMatch] = useState(false);

    useEffect( () => {
        setValidName(NAME_REGEX.test(name));
    }, [name]);

    useEffect( () => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect( () => {
        setValidPassword(PASSWORD_REGEX.test(password));
        setValidMatch(PASSWORD_REGEX.test(match) && password === match);
    }, [password, match]);

    useEffect( () => {
        setErrorMessage('');
    }, [name, password, match]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!NAME_REGEX.test(name) || !EMAIL_REGEX.test(email) || !PASSWORD_REGEX.test(password) || !PASSWORD_REGEX.test(match)) {
            setErrorMessage('Invalid entry');
            return;
        }
        const newUser = {
            name : name,
            email : email,
            password : password,
            role : role
        };
        const loginUser = {
            email : email,
            password : password    
        };
        const registerStatus = await HandleRegister(newUser);
        if (!registerStatus) {
            setErrorMessage('Registration failed');
        }
        try {
            const newCookie = await HandleLogin(loginUser);
            setCookie('user', newCookie, {path:'/'});
            navigate(from, { replace: true });
        } catch(err) {
            setErrorMessage('Auto login failed');
        }
    }


    return (
        <Grid container direction='column' justifyContent='center' alignItems='center' p={10} sx={{ display:'flex' }}>
            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} justifyContent='center' alignItems='center' sx={{ display:'flex' }}>
                <Stack direction='column' spacing={2} p={2}>
                    <Typography variant='h3'>Register</Typography>
                    <Typography variant='h5' color='error'>{errorMessage ? errorMessage : ''}</Typography>
                </Stack>
            </Grid>

            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} justifyContent='center' alignItems='center' sx={{ display:'flex' }}>
                <form onSubmit={handleSubmit}>
                    <Stack direction='column' spacing={3} p={2} justifyContent='center' alignItems='center'>
                        <FormControl fullWidth>
                            <InputLabel>Role *</InputLabel>
                            <Select
                            value={role}
                            label='Role'
                            onChange={(e) => setRole(e.target.value)} >
                                <MenuItem value={'user'}>User</MenuItem>
                                <MenuItem value={'admin'}>Admin</MenuItem>
                            </Select>
                        </FormControl>

                        <Stack direction='row' spacing={1} justifyContent='center' alignItems='center'>
                            <FormControl>
                                <InputLabel>Username *</InputLabel>
                                <OutlinedInput
                                    type='text'
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    label='Username' />
                                    <FormHelperText></FormHelperText>
                            </FormControl>
                            {
                                validName ?
                                <CheckCircleIcon color='success' />
                                : <CancelIcon color='error' />
                            }
                        </Stack>

                        <Stack direction='row' spacing={1} justifyContent='center' alignItems='center'>
                            <FormControl>
                                <InputLabel>Email *</InputLabel>
                                <OutlinedInput
                                    type='email'
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    label='Email' />
                                    <FormHelperText></FormHelperText>
                            </FormControl>
                            {
                                validEmail ?
                                <CheckCircleIcon color='success' />
                                : <CancelIcon color='error' />
                            }
                        </Stack>
                        
                        <Stack direction='row' spacing={1} justifyContent='center' alignItems='center'>
                            <FormControl>
                                <InputLabel>Password *</InputLabel>
                                <OutlinedInput
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    required
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
                            {
                                validPassword ?
                                <CheckCircleIcon color='success' />
                                : <CancelIcon color='error' />
                            }
                        </Stack>

                        <Stack direction='row' spacing={1} justifyContent='center' alignItems='center'>
                            <FormControl>
                                <InputLabel>Confirm password *</InputLabel>
                                <OutlinedInput
                                    type={showMatch ? 'text' : 'password'}
                                    value={match}
                                    required
                                    onChange={(e) => setMatch(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                            onClick={() => setShowMatch(showMatch)}
                                            edge='end' >
                                            {showMatch ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment> }
                                    label='Confirm password' />
                                    <FormHelperText></FormHelperText>
                            </FormControl>
                            {
                                validMatch ?
                                <CheckCircleIcon color='success' />
                                : <CancelIcon color='error' />
                            }
                        </Stack>

                        <Button variant='contained' type='submit' size='large'>
                            Sing Up
                        </Button>
                    </Stack>
                </form>
            </Grid>

            <Grid item xs={4} sm={4} md={4} lg={4} xl={4} justifyContent='center' alignItems='center' sx={{ display:'flex' }}>
                <Stack direction='column' p={2}>
                <Typography variant='subtitle1' color='text.secondary'>* : required fields</Typography>
                <Link to='/login'>Already have an account ?</Link>
                </Stack>
            </Grid>
        </Grid>
    )
}