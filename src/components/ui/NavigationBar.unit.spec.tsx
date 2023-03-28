import { fireEvent, render, screen } from '@/tests/test-utils';
import { MemoryRouter } from 'react-router-dom';
import NavigationBar from './NavigationBar';

jest.mock('react-router-dom', () => ({
  __esModule: true,
  ...jest.requireActual('react-router-dom'),
}));

const renderComponent = (initialEntries = ['/']) => {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <NavigationBar />
    </MemoryRouter>,
  );
};

it('should render the "Go To Cart" anchor at products page', async () => {
  renderComponent();

  expect(screen.getByRole('link', { name: 'Go to Cart' })).toBeInTheDocument();
});

it('should be able to click to go to cart page from products page', () => {
  renderComponent();

  fireEvent.click(screen.getByRole('link', { name: 'Go to Cart' }));

  expect(screen.getByRole('link', { name: 'back' })).toBeInTheDocument();
});

it('should render the "Back" anchor at cart page', async () => {
  renderComponent(['/cart']);

  expect(screen.getByRole('link', { name: 'back' })).toBeInTheDocument();
});

it('should be able to go back to products page from cart page', () => {
  renderComponent(['/cart']);

  fireEvent.click(screen.getByRole('link', { name: 'back' }));

  expect(screen.getByRole('link', { name: 'Go to Cart' })).toBeInTheDocument();
});
