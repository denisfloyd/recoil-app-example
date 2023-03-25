import { atom } from 'recoil';

import { Cart } from '@/types/cart';
import { Product } from '@/types/product';
import { Dispatcher } from './dispatcher';

export const productsState = atom<Product[]>({
  key: 'productsState',
  default: [],
});

export const cartState = atom<Cart>({
  key: 'cartState',
  default: {
    productsInCart: {},
    totalCart: 0,
  },
});

export const dispatcherState = atom<Dispatcher | undefined>({
  key: 'dispatcherState',
  default: undefined,
});
