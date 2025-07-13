import axios from 'axios';

const API = axios.create({
  baseURL: 'https://integraseller.com.br/api',
});

export default API;
