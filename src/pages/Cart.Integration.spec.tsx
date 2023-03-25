import { MutableSnapshot } from 'recoil';
import { render, screen } from '@/tests/test-utils';

import { cartState } from '@/store/atoms';
import Cart from './Cart';

describe('Cart (Integration)', () => {
  function initRecoilState({ set }: MutableSnapshot) {
    set(cartState, {
      productsInCart: {
        '1': {
          quantity: 1,
          totalProduct: 100,
          item: {
            id: 1,
            title: 'Product 1',
            price: 100,
            quantityInCart: 0,
          },
        },
        '2': {
          quantity: 1,
          totalProduct: 200,
          item: {
            id: 2,
            title: 'Product 2',
            price: 200,
            quantityInCart: 0,
          },
        },
      },
      totalCart: 300,
    });
  }

  it('should render products added in cart', () => {
    render(<Cart />, initRecoilState);

    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
  });
});
