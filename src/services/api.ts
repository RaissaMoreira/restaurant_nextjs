import axios from 'axios';

let apiBaseUrl = 'http://192.168.1.4:3000';

const api = axios.create({
  baseURL: apiBaseUrl,
});

export default api;