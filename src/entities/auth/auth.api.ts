import { client } from 'shared/lib';

import { AuthResponse } from './auth.types';

export const register = (email: string, password: string, name: string) => {
  return client.post<AuthResponse>('/api/auth/register', {
    email,
    password,
    name,
  });
};

export const login = (email: string, password: string) => {
  return client.post<AuthResponse>('/api/auth/login', {
    email,
    password,
  });
};
