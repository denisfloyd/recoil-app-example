import { useRecoilCallback } from 'recoil';

import { Product } from '@/types/product';
import { cartState } from './atoms';

export const createDispatcher = () => {
  const addProductToCart = useRecoilCallback(
    ({ snapshot, set }) =>
      async (productPayload: Product) => {
        let cart = await snapshot.getPromise(cartState);
        const foundProduct = cart.products[productPayload.id];

        const newProduct = {
          ...(foundProduct
            ? {
                quantity: foundProduct.quantity + 1,
                totalProduct: foundProduct.totalProduct + productPayload.price,
              }
            : { quantity: 1, totalProduct: productPayload.price }),
        };

        cart = {
          ...cart,
          products: {
            ...cart.products,
            [productPayload.id]: newProduct,
          },
        };

        set(cartState, () => cart);
      },
  );

  return {
    addProductToCart,
  };
};

export type Dispatcher = ReturnType<typeof createDispatcher>;
