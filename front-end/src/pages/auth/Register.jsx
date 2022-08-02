import { useState, useEffect } from 'react';

import { Link, useNavigate, useLocation } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import axios from '../../api/Axios';

import { RegisterAPI, LoginAPI } from '../../services/AuthServices';

import { login } from '../../store/reducers/Auth';

import Loading from '../utils/Loading';
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
    Select,
    MenuItem,
    Checkbox
} from '@mui/material';

import { styled } from '@mui/material/styles';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


const NAME_REGEX = /^[a-zA-Z][a-z-A-Z0-9-_ ]{3,24}$/;
const EMAIL_REGEX = /^[a-zA-Z][a-zA-Z0-9.-_]+@[a-zA-Z]+\.([a-zA-Z])+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%-_]).{8,24}$/;

const MyLink = styled(Link)(({ theme }) => ({
    color: theme.palette.link.main,
    '&:visited':{
        color: theme.palette.link.visited
    }
}));

export default function Register() {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [role, setRole] = useState('');
    const [validRole, setValidRole] = useState(false);
    const [roles, setRoles] = useState([]);

    const [name, setName] = useState('');
    const [validName, setValidName] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);

    const [match, setMatch] = useState('');
    const [validMatch, setValidMatch] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showMatch, setShowMatch] = useState(false);

    const [agree, setAgree] = useState(false);

    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect( () => {
        axios.get('/auth/get-roles')
        .then( (res) => {
            setRoles(res?.data?.roles);
            setLoading(false);
        })
        .catch(function (error) {
            setErrorMessage('Failed to load roles');
            setLoading(false);
        });
    }, []);

    useEffect( () => {
        setValidRole(role !== '');
    }, [role]);

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
        if (!NAME_REGEX.test(name) || !EMAIL_REGEX.test(email) || !PASSWORD_REGEX.test(password) || !PASSWORD_REGEX.test(match) || role === '') {
            setErrorMessage('Some fields are invalid');
            return;
        }
        if (!agree) {
            setErrorMessage('You must agree to our terms of service')
            return;
        }
        const newUser = {
            name : name,
            email : email,
            password : password,
            role_id : role
        };
        const loginUser = {
            email : email,
            password : password,
            remember : false
        };
        try {
            await RegisterAPI(newUser);
            setSuccessMessage('Registration successful');
        } 
        catch(err) {
            setErrorMessage('Registration failed');
        }
        try {
            const resAPI = await LoginAPI(loginUser);
            dispatch(login({ resAPI }));
            navigate(from, { replace: true });
        } 
        catch(err) {
            setErrorMessage('Auto login failed');
        }
    }


    return (
        <>
            {loading
            ? 
                <Loading />
            :
                <>
                    <Headers />
                    <Grid container direction='column' justifyContent='center' alignItems='center' py='3%' sx={{ display:'flex' }}>
                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4} justifyContent='center' alignItems='center' sx={{ display:'flex' }}>
                            <Stack direction='column' spacing={2} p={2}>
                                <Typography variant='h3'>Register</Typography>
                                <Typography variant='h5' sx={{  color:'success.main' }}>{successMessage ? successMessage : ''}</Typography>
                                <Typography variant='h5' sx={{  color:'error.main' }}>{errorMessage ? errorMessage : ''}</Typography>
                            </Stack>
                        </Grid>

                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4} justifyContent='center' alignItems='center' sx={{ display:'flex' }}>
                        <form onSubmit={handleSubmit}>
                                <Stack direction='column' spacing={3} p={2} justifyContent='center' alignItems='center'>
                                    <Stack direction='row' spacing={1} justifyContent='center' alignItems='center'>
                                        <FormControl sx={{ width:250 }}>
                                            <InputLabel>Role*</InputLabel>
                                            <Select
                                            value={role}
                                            label='Role'
                                            onChange={(e) => setRole(e.target.value)} >
                                                {roles.map( (index) =>
                                                    <MenuItem key={index.id} value={index.id}>{index.name}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                        {
                                            validRole ?
                                            <CheckCircleIcon color='success' />
                                            : <CancelIcon color='error' />
                                        }
                                    </Stack>

                                    <Stack direction='row' spacing={1} justifyContent='center' alignItems='center'>
                                        <FormControl sx={{ width:250 }}>
                                            <InputLabel>Username*</InputLabel>
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
                                        <FormControl  sx={{ width:250 }}>
                                            <InputLabel>Email*</InputLabel>
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
                                        <FormControl  sx={{ width:250 }}>
                                            <InputLabel>Password*</InputLabel>
                                            <OutlinedInput
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                required
                                                autoComplete='off'
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
                                        <FormControl  sx={{ width:250 }}>
                                            <InputLabel>Confirm password*</InputLabel>
                                            <OutlinedInput
                                                type={showMatch ? 'text' : 'password'}
                                                value={match}
                                                required
                                                autoComplete='off'
                                                onChange={(e) => setMatch(e.target.value)}
                                                endAdornment={
                                                    <InputAdornment position='end'>
                                                        <IconButton
                                                        onClick={() => setShowMatch(!showMatch)}
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

                                    <Stack direction='row' spacing={0.1} justifyContent='center' alignItems='center'>
                                        <Checkbox checked={agree}  onChange={() => setAgree(!agree)} />
                                        <Typography variant='subtitle1' paragraph={true}>
                                            By signing up, you agree to our&nbsp;
                                            <MyLink to='/terms_of_service' target='_blank' rel='noreferrer' sx={{ textDecoration: 'none' }}>Terms of service</MyLink>
                                            &nbsp;and&nbsp;<MyLink to='/privacy_policy' target='_blank' rel='noreferrer' sx={{ textDecoration: 'none' }}>Privacy policy</MyLink>.
                                        </Typography>
                                    </Stack>

                                    <Button variant='contained' type='submit' size='large'>
                                        Sing Up
                                    </Button>
                                </Stack>
                            </form>
                        </Grid>

                        <Grid item xs={4} sm={4} md={4} lg={4} xl={4} justifyContent='center' alignItems='center' sx={{ display:'flex' }}>
                            <Stack direction='column' alignItems='center' justifyContent='center'>
                            <Typography variant='subtitle1' color='text.secondary'>* = required fields</Typography>
                            <MyLink to='/login'>Already have an account ?</MyLink>
                            </Stack>
                        </Grid>
                    </Grid>
                </>
            }
        </>
    )
}