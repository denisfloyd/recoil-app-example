import { useRecoilCallback } from 'recoil';

import { Product } from '@/types/product';
import { Cart, ProductInCart } from '@/types/cart';
import { cartState } from './atoms';

export const createDispatcher = () => {
  const addProductToCart = useRecoilCallback(
    ({ snapshot, set }) =>
      async (productPayload: Product) => {
        const cart = await snapshot.getPromise(cartState);
        let productFound = cart.productsInCart[productPayload.id];

        if (productFound) {
          return updateProductQuantityInCart(productFound, true);
        }

        set(cartState, (oldCart: Cart) => {
          return {
            ...oldCart,
            productsInCart: {
              ...oldCart.productsInCart,
              [productPayload.id]: {
                quantity: 1,
                totalProduct: productPayload.price,
                item: productPayload,
              },
            },
            totalCart: oldCart.totalCart + productPayload.price,
          };
        });
      },
  );

  const updateProductQuantityInCart = useRecoilCallback(
    ({ set }) =>
      async (productInCart: ProductInCart, isAdding: boolean) => {
        const newQuantity = productInCart.quantity + (isAdding ? 1 : -1);
        if (newQuantity === 0) {
          return removeProductInCart(productInCart.item.id);
        }

        const productInCartUpdate = {
          ...productInCart,
          quantity: newQuantity,
          totalProduct: newQuantity * productInCart.item.price,
        };

        set(cartState, (oldCart: Cart) => {
          return {
            ...oldCart,
            productsInCart: {
              ...oldCart.productsInCart,
              [productInCart.item.id]: productInCartUpdate,
            },
            totalCart: oldCart.totalCart + (isAdding ? 1 : -1) * productInCart.item.price,
          };
        });
      },
  );

  const removeProductInCart = useRecoilCallback(
    ({ snapshot, set }) =>
      async (productId: number) => {
        const cart = await snapshot.getPromise(cartState);
        const { [productId]: removedProductInCart, ...updatedProductsInCart } = cart.productsInCart;

        set(cartState, (oldCart: Cart) => {
          return {
            ...oldCart,
            productsInCart: updatedProductsInCart,
            totalCart: oldCart.totalCart - removedProductInCart.totalProduct,
          };
        });
      },
  );

  const checkoutCart = useRecoilCallback(({ reset }) => async () => {
    reset(cartState);
  });

  return {
    addProductToCart,
    updateProductQuantityInCart,
    checkoutCart,
  };
};

export type Dispatcher = ReturnType<typeof createDispatcher>;
