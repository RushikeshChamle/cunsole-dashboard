// utils/axiosInstance.ts
import axios from 'axios';
import { getCookie } from 'cookies-next';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:9000/', // Set your base URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
