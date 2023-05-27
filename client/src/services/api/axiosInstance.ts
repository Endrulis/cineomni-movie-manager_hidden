import axios, { AxiosInstance } from 'axios';
import { config } from '../../config/EnvironmentConfig';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: config.url.API_BASE_URL,
});

export default axiosInstance;
