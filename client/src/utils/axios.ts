import axios from 'axios';

const baseURL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:8080/api'
    : 'https://gymflow-production.up.railway.app/api';

export const API = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
