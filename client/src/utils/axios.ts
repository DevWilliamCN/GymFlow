import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://gymflow-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

