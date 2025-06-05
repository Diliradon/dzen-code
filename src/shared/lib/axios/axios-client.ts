import { AxiosRequestConfig } from 'axios';

import instance from './axios-interce';

export const client = {
  async get<T>(url: string, config?: AxiosRequestConfig) {
    try {
      const response = await instance.get<T>(url, config);

      return response.data;
    } catch (error) {
      if (error instanceof Error && 'status' in error && error.status === 401) {
        // Handle unauthorized access - implement sign out logic here
      }

      throw error;
    }
  },

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    if (typeof data === 'undefined') {
      const response = await instance.post<T>(url);

      return response.data;
    }

    const response = await instance.post<T>(url, data, config);

    return response.data;
  },

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    if (typeof data === 'undefined') {
      const response = await instance.post<T>(url);

      return response.data;
    }

    const response = await instance.post<T>(url, data, config);

    return response.data;
  },

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig) {
    if (typeof data === 'undefined') {
      const response = await instance.put<T>(url);

      return response.data;
    }

    const response = await instance.put<T>(url, data, config);

    return response.data;
  },

  delete(url: string, config?: AxiosRequestConfig) {
    return instance.delete(url, config);
  },
};
