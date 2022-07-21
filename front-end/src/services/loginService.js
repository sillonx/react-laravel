import axios from '../api/axios';

const HandleLogin = async(loginUser) => {

    return axios.post('login', loginUser, {headers: { 'Content-Type': 'application/json'}}).then( (res) => {
        const user = res?.data?.user;
        const accessToken = res?.data?.accessToken;
        const role = res?.data?.role[0]?.public;
        return { user, accessToken, role };
    });
}

export default HandleLogin;