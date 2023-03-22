type MapProduct = {
  [key: string]: {
    quantity: number;
    totalProduct: number;
  };
};

export interface Cart {
  products: MapProduct;
  totalCart: number;
}
