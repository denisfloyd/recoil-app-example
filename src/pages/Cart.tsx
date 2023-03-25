import CartItem from '@/components/ui/CartItem';
import { cartState, dispatcherState } from '@/store/atoms';
import { formatPrice } from '@/utils';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

const Container = styled.div`
  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 0;
  }
`;

const Cart = () => {
  const cart = useRecoilValue(cartState);
  const dispatcher = useRecoilValue(dispatcherState);
  const totalCartPrice = formatPrice(cart.totalCart);

  const handleCheckout = () => dispatcher?.checkoutCart();

  return (
    <Container>
      <h1>Total Cart: {totalCartPrice}</h1>
      <ul>
        {Object.values(cart.productsInCart).map(product => (
          <CartItem key={product.item.id} productInCart={product} />
        ))}
      </ul>

      {cart.totalCart > 0 && <button onClick={handleCheckout}>Checkout</button>}
    </Container>
  );
};

export default Cart;
