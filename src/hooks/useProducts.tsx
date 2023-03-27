import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { api } from '@/services/api';
import { Product } from '@/types/product';

const getProducts = async () => {
  const { data: products } = await api.get<AxiosResponse<Product[]>>('/products');
  return products;
};

export default function useProducts(): UseQueryResult<Product[], unknown> {
  return useQuery(['products'], getProducts, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchIntervalInBackground: false,
  });
}
