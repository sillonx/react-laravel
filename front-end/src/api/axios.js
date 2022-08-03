import axios from 'axios';

// Initializing Axios with Rest API URL
export default axios.create({
    baseURL: 'http://127.0.0.1:8000/api'
}) 