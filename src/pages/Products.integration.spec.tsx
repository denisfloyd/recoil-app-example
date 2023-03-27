import { fireEvent, render, screen, waitFor, within } from '@/tests/test-utils';
import Products from './Products';

jest.mock('@/services/api', () => ({
  api: {
    get: () =>
      Promise.resolve({
        data: [
          {
            id: 1,
            title: 'Product 1',
            price: 100,
          },
          {
            id: 2,
            title: 'Product 2',
            price: 200,
          },
        ],
      }),
  },
}));

describe('Products (Integration)', () => {
  it('should render products in list', async () => {
    render(<Products />);

    expect(await screen.findByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText(/100.00/i)).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText(/200.00/i)).toBeInTheDocument();
  });

  it('should initilize all products with quantity equal to zero', async () => {
    render(<Products />);

    const product1 = await screen.findByTestId('product-item-1');
    const product2 = screen.getByTestId('product-item-2');

    expect(within(within(product1).getByText(/in cart:/i)).getByText(/0/i)).toBeInTheDocument();
    expect(within(within(product2).getByText(/in cart:/i)).getByText(/0/i)).toBeInTheDocument();
  });

  it('should be able to buy a product', async () => {
    render(<Products />);

    const product1 = await screen.findByTestId('product-item-1');
    fireEvent.click(within(product1).getByRole('button'));

    await waitFor(() => {
      expect(within(within(product1).getByText(/in cart:/i)).getByText(/1/i)).toBeInTheDocument();
    });
  });

  it('should augment the product quantity in cart if click twice to add it', async () => {
    render(<Products />);

    const product1 = await screen.findByTestId('product-item-1');
    fireEvent.click(within(product1).getByRole('button'));
    await waitFor(() => {
      expect(within(within(product1).getByText(/in cart:/i)).getByText(/1/i)).toBeInTheDocument();
    });
    fireEvent.click(within(product1).getByRole('button'));

    await waitFor(() => {
      expect(within(within(product1).getByText(/in cart:/i)).getByText(/2/i)).toBeInTheDocument();
    });
  });
});
