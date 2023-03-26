import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import { dispatcherState } from '@/store/atoms';
import { ProductInCart } from '@/types/cart';
import { formatPrice } from '@/utils';

const Container = styled.li`
  position: relative;
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

const RemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: transparent;
  padding: 5px;
`;

const CartItem = ({ productInCart }: { productInCart: ProductInCart }) => {
  const dispatcher = useRecoilValue(dispatcherState);
  const price = formatPrice(productInCart.totalProduct);
  const productUnitPrice = formatPrice(productInCart.item.price);

  const handleChangeProductQuantityInCart = (isAdding: boolean) => {
    dispatcher?.updateProductQuantityInCart(productInCart, isAdding);
  };

  const handleRemoveProductFromCart = () => {
    dispatcher?.removeProductInCart(productInCart.item.id)
  }

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
        <button
          data-testid={`product-${productInCart.item.id}-augment-quantity`}
          onClick={() => handleChangeProductQuantityInCart(true)}
        >
          +
        </button>
        <button
          data-testid={`product-${productInCart.item.id}-decrease-quantity`}
          onClick={() => handleChangeProductQuantityInCart(false)}
        >
          -
        </button>
      </ActionButtons>

      <RemoveButton
        onClick={handleRemoveProductFromCart}
        data-testid={`remove-product-${productInCart.item.id}`}
      >
        X
      </RemoveButton>
    </Container>
  );
};

export default CartItem;
