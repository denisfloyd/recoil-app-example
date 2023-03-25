import { render, screen } from '@/tests/test-utils';
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
});
