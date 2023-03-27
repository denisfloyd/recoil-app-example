import { MutableSnapshot } from 'recoil';
import { fireEvent, render, screen, waitForElementToBeRemoved, within } from '@/tests/test-utils';

import { cartState } from '@/store/atoms';
import Cart from './Cart';

describe('Cart (Integration)', () => {
  function initRecoilState({ set }: MutableSnapshot) {
    set(cartState, {
      productsInCart: {
        '1': {
          quantity: 2,
          totalProduct: 200,
          item: {
            id: 1,
            title: 'Product 1',
            price: 100,
            quantityInCart: 0,
          },
        },
        '2': {
          quantity: 2,
          totalProduct: 400,
          item: {
            id: 2,
            title: 'Product 2',
            price: 200,
            quantityInCart: 0,
          },
        },
      },
      totalCart: 600,
    });
  }

  it('should render products added in cart', () => {
    render(<Cart />, initRecoilState);

    const [product1, product2] = screen.getAllByRole('listitem');
    expect(within(product1).getByText(/Product 1/i)).toBeInTheDocument();
    expect(within(product2).getByText(/Product 2/i)).toBeInTheDocument();
  });

  it('should render products total and quantity correctly in cart', () => {
    render(<Cart />, initRecoilState);

    const [product1, product2] = screen.getAllByRole('listitem');
    expect(within(product1).getByText(/quantity: 2/i)).toBeInTheDocument();
    expect(
      within(within(product1).getByText(/total product:/i)).getByText(/200/i),
    ).toBeInTheDocument();
    expect(within(product2).getByText(/quantity: 2/i)).toBeInTheDocument();
    expect(
      within(within(product2).getByText(/total product:/i)).getByText(/400/i),
    ).toBeInTheDocument();
  });

  it('should render total value of cart', () => {
    render(<Cart />, initRecoilState);

    expect(
      screen.getByRole('heading', {
        name: /total cart: r\$600\.00/i,
      }),
    ).toBeInTheDocument();
  });

  it('should decrease a product quantity in cart', () => {
    render(<Cart />, initRecoilState);

    fireEvent.click(screen.getByTestId('product-1-decrease-quantity'));

    expect(
      screen.getByRole('heading', {
        name: /total cart: r\$500\.00/i,
      }),
    ).toBeInTheDocument();
    const [product1] = screen.getAllByRole('listitem');
    expect(within(product1).getByText(/quantity: 1/i)).toBeInTheDocument();
    expect(
      within(within(product1).getByText(/total product:/i)).getByText(/100/i),
    ).toBeInTheDocument();
  });

  it('should augment a product quantity in cart', () => {
    render(<Cart />, initRecoilState);

    fireEvent.click(screen.getByTestId('product-1-augment-quantity'));

    expect(
      screen.getByRole('heading', {
        name: /total cart: r\$700\.00/i,
      }),
    ).toBeInTheDocument();
    const [product1] = screen.getAllByRole('listitem');
    expect(within(product1).getByText(/quantity: 3/i)).toBeInTheDocument();
    expect(
      within(within(product1).getByText(/total product:/i)).getByText(/300/i),
    ).toBeInTheDocument();
  });

  it('should remove a product from cart after set their quantity to zero', async () => {
    render(<Cart />, initRecoilState);

    fireEvent.click(screen.getByTestId('product-1-decrease-quantity'));
    fireEvent.click(screen.getByTestId('product-1-decrease-quantity'));

    await waitForElementToBeRemoved(() => screen.getByTestId('product-1-decrease-quantity'));
    expect(screen.queryByText(/product 1 \-/i)).not.toBeInTheDocument();
  });

  it('should remove a product from cart', async () => {
    render(<Cart />, initRecoilState);

    fireEvent.click(screen.getByTestId('remove-product-1'));

    await waitForElementToBeRemoved(() => screen.getByTestId('product-1-decrease-quantity'));
    expect(screen.queryByText(/product 1 \-/i)).not.toBeInTheDocument();
  });

  it('should be able to do cart checkout', async () => {
    render(<Cart />, initRecoilState);

    fireEvent.click(screen.getByRole('button', { name: /checkout/i }));

    expect(screen.queryByText(/product 1 \-/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/product 2 \-/i)).not.toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /total cart: r\$0\.00/i,
      }),
    ).toBeInTheDocument();
  });
});
