import { Cart, ProductInCart } from '@/types/cart';
import { formatPrice } from '@/utils';
import styled from 'styled-components';

const Container = styled.li`
  width: 500px;
  display: flex;
  padding: 20px;
  flex-direction: column;
  border: 1px solid #fff;

  color: #fff;
`;

const ActionButtons = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const CartItem = ({ productInCart }: { productInCart: ProductInCart }) => {
  const price = formatPrice(productInCart.totalProduct);

  return (
    <Container>
      <span>{productInCart.name}</span>
      <span>Quantity: {productInCart.quantity}</span>
      <span>{price}</span>

      <ActionButtons>
        <button>+</button>
        <button>-</button>
      </ActionButtons>
    </Container>
  );
};

export default CartItem;
