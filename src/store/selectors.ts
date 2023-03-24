import { selector } from 'recoil';
import { cartState, productsState } from './atoms';

export const productsListMergedWithCartState = selector({
  key: 'productsListMergedWithCartState',
  get: ({ get }) => {
    const productList = get(productsState);
    const cart = get(cartState);

    const productsListMergedWithCart = productList.map(product => ({
      ...product,
      quantityInCart: cart.products[product.id]?.quantity || 0,
    }));

    return {
      products: productsListMergedWithCart,
    };
  },
});
