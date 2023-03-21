import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { api } from 'services/api';
import { Product } from 'types/product';

const getProducts = async () => {
  const products = await api.get<AxiosResponse<Product[]>>('/products');
  return products.data;
};

export default function useProducts(): UseQueryResult<Product[], unknown> {
  return useQuery(['products'], () => getProducts(), {
    refetchInterval: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchIntervalInBackground: false,
  });
}
