import axios from 'axios';
const BASE_URL = 'https://www.googleapis.com';

export default axios.create({
    baseURL: BASE_URL
});

