import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { dispatcherState } from '@/store/atoms';
import { ProductInCart } from '@/types/cart';
import { formatPrice } from '@/utils';

const Container = styled.li`
  width: 500px;
  display: flex;
  padding: 20px;
  flex-direction: column;
  border: 1px solid #fff;

  color: #fff;

  p {
    margin: 0;
  }
`;

const ActionButtons = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const CartItem = ({ productInCart }: { productInCart: ProductInCart }) => {
  const dispatcher = useRecoilValue(dispatcherState);
  const price = formatPrice(productInCart.totalProduct);
  const productUnitPrice = formatPrice(productInCart.item.price);

  const onHandleChangeProductQuantityInCart = (isAdding: boolean) => {
    dispatcher?.updateProductQuantityInCart(productInCart, isAdding);
  };

  return (
    <Container>
      <p>
        {productInCart.item.title} - <span>{productUnitPrice}</span>
      </p>
      <span>Quantity: {productInCart.quantity}</span>
      <span>
        Total Product: <b>{price}</b>
      </span>

      <ActionButtons>
        <button onClick={() => onHandleChangeProductQuantityInCart(true)}>+</button>
        <button onClick={() => onHandleChangeProductQuantityInCart(false)}>-</button>
      </ActionButtons>
    </Container>
  );
};

export default CartItem;
