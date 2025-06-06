import { useMutation } from '@tanstack/react-query';

import { login, register } from './auth.api';
import { AuthResponse } from './auth.types';

type LoginCredentials = {
  email: string;
  password: string;
};

type RegisterCredentials = {
  email: string;
  password: string;
  name: string;
};

export const useLogin = () => {
  return useMutation<AuthResponse, Error, LoginCredentials>({
    mutationFn: ({ email, password }) => login(email, password),
  });
};

export const useRegister = () => {
  return useMutation<AuthResponse, Error, RegisterCredentials>({
    mutationFn: ({ email, password, name }) => register(email, password, name),
  });
};
