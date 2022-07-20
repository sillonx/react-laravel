import { useState, useEffect } from 'react';

import useAuth from '../../hooks/useAuth';

import axios from '../../api/axios';

import { 
Typography,
Grid,
Stack,
Button,
Link,
OutlinedInput,
InputAdornment,
InputLabel,
IconButton,
FormControl,
FormHelperText } from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const NAME_REGEX = /^[a-zA-Z][a-z-A-Z0-9-_]{3,24}$/;
const EMAIL_REGEX = /^[a-zA-Z][a-zA-Z0-9.-_]+@[a-zA-Z]+\.([a-zA-Z])+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%-_]).{8,24}$/;


export default function Register () {

    const { setAuth } = useAuth();

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

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleClickShowMatch = () => {
        setShowMatch(!showMatch);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!NAME_REGEX.test(name) || !EMAIL_REGEX.test(email) || !PASSWORD_REGEX.test(password) || !PASSWORD_REGEX.test(match)) {
            setErrorMessage("Invalid entry");
            return;
        }
        const newUser = {
            name : name,
            email : email,
            password : password    
        };
        try {
            axios.post('register', newUser, {headers: { 'Content-Type': 'application/json'}}).then( (res) => {
                const accessToken = res?.data?.accessToken;
                setAuth({ email, password, accessToken });
            });
        } catch (err) {
            setErrorMessage('Register failed');
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
                        <Stack direction='row' spacing={1} justifyContent='center' alignItems='center'>
                            <FormControl>
                                <InputLabel>Username *</InputLabel>
                                <OutlinedInput
                                    type='text'
                                    value={name}
                                    required
                                    autoComplete='off'
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
                                    autoComplete='off'
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
                                    autoComplete='off'
                                    onChange={(e) => setMatch(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                            onClick={handleClickShowMatch}
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
                <Link href='/login' variant='subtitle1'>Already have an account ?</Link>
                </Stack>
            </Grid>
        </Grid>
    )
}