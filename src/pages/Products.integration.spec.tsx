import { render, screen } from '@/tests/test-utils';
import Products from './Products';

// jest.mock('axios', () => ({
//   ...jest.requireActual('axios'),
//   create: jest.fn(),
// }));

// jest.mock('')

jest.mock('@/services/api');
const axiosMock = jest.requireMock('@/services/api');

describe('Products (Integration)', () => {
  it('should do ', () => {
    jest.spyOn(axiosMock, 'api').mockImplementation(() => {
      return {
        get: Promise.resolve([
          {
            id: 1,
            title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
            price: 109.95,
            description:
              'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
            category: "men's clothing",
            image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
            rating: {
              rate: 3.9,
              count: 120,
            },
          },
        ]),
      };
    });
    render(<Products />);

    screen.debug();
  });
});
