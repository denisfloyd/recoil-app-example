import { Cart } from './../types/cart';
import { atom } from 'recoil';
import { Product } from 'types/product';
import { Dispatcher } from './dispatcher';

export const productsState = atom<Product[]>({
  key: 'productsState',
  default: [],
});

export const cartState = atom<Cart>({
  key: 'cartState',
  default: {
    products: {},
    totalCart: 0,
  },
});

export const dispatcherState = atom<Dispatcher | undefined>({
  key: 'dispatcherState',
  default: undefined,
});
