import { useRecoilCallback } from 'recoil';

import { Product } from '@/types/product';
import { Cart } from '@/types/cart';
import { cartState } from './atoms';

const calculateTotalCartPrice = (products: Cart['products']): number => {
  return Object.values(products).reduce((total, product) => total + product.totalProduct, 0);
};

export const createDispatcher = () => {
  const addProductToCart = useRecoilCallback(
    ({ snapshot, set }) =>
      async (productPayload: Product) => {
        let cart = await snapshot.getPromise(cartState);
        let foundProduct = cart.products[productPayload.id];

        const productToAddOrEditInCart = {
          ...(foundProduct
            ? {
                quantity: foundProduct.quantity + 1,
                totalProduct: foundProduct.totalProduct + productPayload.price,
              }
            : { quantity: 1, totalProduct: productPayload.price }),
        };

        const newProducts = {
          ...cart.products,
          [productPayload.id]: productToAddOrEditInCart,
        };

        set(cartState, (oldCart: Cart) => {
          return {
            ...oldCart,
            products: newProducts,
            totalCart: calculateTotalCartPrice(newProducts),
          };
        });
      },
  );

  return {
    addProductToCart,
  };
};

export type Dispatcher = ReturnType<typeof createDispatcher>;
