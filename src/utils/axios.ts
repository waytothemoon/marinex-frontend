import axios from 'axios';
import { getSession } from 'next-auth/react';

const axiosServices = axios.create({ baseURL: process.env.SHIPFINEX_BACKEND_URL || 'http://localhost:3010/' });

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.token.accessToken) {
      config.headers['Authorization'] = `Bearer ${session?.token.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosServices.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // NextResponse.redirect(`http://localhost:3000/signin`);
    }
    return Promise.reject(error);
  }
);

export default axiosServices;
