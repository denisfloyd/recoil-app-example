import { Cart, ProductInCart } from '@/types/cart';
import { formatPrice } from '@/utils';
import styled from 'styled-components';

const Container = styled.div`
  width: 300px;
  display: flex;
  padding: 20px;
  flex-direction: column;
  border: 1px solid #fff;

  color: #fff;
`;

const CartItem = ({ productInCart }: { productInCart: ProductInCart }) => {
  const price = formatPrice(productInCart.totalProduct);

  return (
    <Container>
      <span>{productInCart.name}</span>
      <span>Quantity: {productInCart.quantity}</span>
      <span>{price}</span>
    </Container>
  );
};

export default CartItem;
