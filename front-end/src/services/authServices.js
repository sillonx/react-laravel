import axios from '../api/axios';


export const RegisterAPI = async (newUser) => {

    return axios.post('auth/register', newUser, {headers: { 'Content-Type': 'application/json'}})
    .then( (res) => {
        return res?.data?.message;
    })
    .catch(function (error) {
        console.log('[SERVER] The above error occured because the fields don\'t match the requirements');
        return error?.response?.data?.message;
    })
}

export const LoginAPI = async (loginUser) => {
    return axios.post('auth/login', loginUser, {withCredentials:true})
    .then( (res) => {
        const name = res?.data?.user?.name;
        const email = res?.data?.user?.email;
        const created_at = res?.data?.user?.created_at;
        const permissions = res?.data?.permissions;
        return { name, email, created_at, permissions };
    })
    .catch(function (error) {
        return error?.response?.data?.message;
    })
}

export const LogoutAPI = async () => {
    return axios.post('auth/logout', {}, {withCredentials:true})
    .then( (res) => {
        return res?.data?.message;
    });
}
