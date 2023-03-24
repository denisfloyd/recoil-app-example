export type ProductInCart = {
  name: string;
  quantity: number;
  totalProduct: number;
};

type MapProduct = {
  [key: string]: ProductInCart;
};

export interface Cart {
  products: MapProduct;
  totalCart: number;
}
