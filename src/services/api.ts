import axios from 'axios';

let apiBaseUrl = 'http://192.168.1.9:3001';
// let apiBaseUrl = `${window.location.hostname}:3001`;
// const apiBaseUrl = process.env.API_BASE_URL;
console.log("aaaa ",apiBaseUrl);

const api = axios.create({
  baseURL: apiBaseUrl,
});

export default api;