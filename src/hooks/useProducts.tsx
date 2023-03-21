import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { SetterOrUpdater } from 'recoil';
import { api } from 'services/api';
import { Product } from 'types/product';

const getProducts = async (dispatch: SetterOrUpdater<Product[]>) => {
  const { data: products } = await api.get<AxiosResponse<Product[]>>('/products');
  dispatch(() => products);
  return products;
};

export default function useProducts(
  dispatch: SetterOrUpdater<Product[]>,
): UseQueryResult<Product[], unknown> {
  return useQuery(['products'], () => getProducts(dispatch), {
    refetchInterval: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchIntervalInBackground: false,
  });
}
