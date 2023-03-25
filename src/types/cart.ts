import { Product } from './product';

export type ProductInCart = {
  item: Product;
  quantity: number;
  totalProduct: number;
};

type MapProduct = {
  [key: string]: ProductInCart;
};

export interface Cart {
  productsInCart: MapProduct;
  totalCart: number;
}
