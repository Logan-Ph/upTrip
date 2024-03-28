import axios from 'axios';
const BASE_URL = 'https://up-trip-server.vercel.app';

export default axios.create({
    baseURL: BASE_URL
});

