import axios from '../api/axios';


const HandleRegister = async(newUser) => {

    return axios.post('register', newUser, {headers: { 'Content-Type': 'application/json'}}).then( (res) => {
        return res?.message === 'Registration successful';
    });
}

export default HandleRegister;