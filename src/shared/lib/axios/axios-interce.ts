import axios from 'axios';
import { env } from 'env';

const instance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
});

const getToken = () => {
  const token = 'token';

  return token;
};

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response?.status === 401) {
      // Handle unauthorized access - implement proper error handling here
    }

    return Promise.reject(error);
  },
);

instance.interceptors.request.use(
  async config => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  error => Promise.reject(error),
);

export default instance;
