import { useQuery } from '@tanstack/react-query';

import { getProducts } from './products.api';
import { ProductsResponse } from './products.types';

const PRODUCTS_QUERY_KEY = 'products';

export const useProducts = () => {
  return useQuery<ProductsResponse, Error>({
    queryKey: [PRODUCTS_QUERY_KEY],
    queryFn: getProducts,
    // eslint-disable-next-line no-magic-numbers
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
};
