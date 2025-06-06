import { client } from 'shared/lib';

import { MeResponse } from './me.types';

export const getMe = () => {
  return client.get<MeResponse>('/api/auth/me');
};
