import axios from 'axios';

let apiBaseUrl = 'http://127.0.0.1:3001';

const api = axios.create({
  baseURL: apiBaseUrl,
});

export default api;