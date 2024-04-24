const axios = require('axios');
const BASE_URL = 'http://localhost:4000';

const api = axios.create({
    baseURL: BASE_URL
});

module.exports = api;

