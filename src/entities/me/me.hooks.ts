import { useQuery } from '@tanstack/react-query';

import { useAuth } from 'shared/lib';

import { getMe } from './me.api';
import { MeResponse } from './me.types';

const ME_QUERY_KEY = 'me';

export const useMe = () => {
  const { isAuthenticated, token } = useAuth();

  return useQuery<MeResponse, Error>({
    queryKey: [ME_QUERY_KEY],
    queryFn: getMe,
    enabled: isAuthenticated && !!token,
    // eslint-disable-next-line no-magic-numbers
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
