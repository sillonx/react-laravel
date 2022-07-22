import axios from '../api/axios';

export const HandleLogin = async(loginUser) => {

    return axios.post('auth/login', loginUser, {headers: { 'Content-Type': 'application/json'}}).then( (res) => {
        const user = res?.data?.user;
        const accessToken = res?.data?.accessToken;
        const role = res?.data?.role?.public;
        return { user, accessToken, role };
    });
}

export const HandleRegister = async(newUser) => {

    return axios.post('auth/register', newUser, {headers: { 'Content-Type': 'application/json'}}).then( (res) => {
        return res?.message === 'Registration successful';
    });
}