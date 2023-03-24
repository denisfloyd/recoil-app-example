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
                name: foundProduct.name,
              }
            : { quantity: 1, totalProduct: productPayload.price, name: productPayload.title }),
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

  const checkoutCart = useRecoilCallback(({ reset }) => async () => {
    reset(cartState);
  });

  return {
    addProductToCart,
    checkoutCart,
  };
};

export type Dispatcher = ReturnType<typeof createDispatcher>;
