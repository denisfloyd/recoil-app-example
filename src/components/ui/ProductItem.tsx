import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';

import { dispatcherState } from '@/store/atoms';
import { Product } from '@/types/product';

interface ContainerProps {
  isHighlighted: boolean;
}

const Container = styled.div<ContainerProps>`
  width: 300px;
  border-radius: 2px;
  border: 1px solid #fff;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${props =>
    props.isHighlighted &&
    css`
      border-color: #11ffaa;

      p.cart-quantity {
        color: #11ffaa;
      }
    `}

  color: #fff;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  button span {
    background-color: #fff;
    padding: 4px;
    border-radius: 20px;
    color: #000;
  }
`;

interface Props {
  product: Product;
}

const ProductItem = ({ product }: Props) => {
  const dispatcher = useRecoilValue(dispatcherState);

  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(product.price);

  const handleAddProductToCart = () => {
    dispatcher?.addProductToCart(product);
  };

  return (
    <Container isHighlighted={product.quantityInCart > 0}>
      <h3>{product.title}</h3>
      <p className="cart-quantity">
        In Cart: <span>{product.quantityInCart}</span>
      </p>

      <Content>
        <span>Price: {price}</span>
        <button onClick={handleAddProductToCart}>Buy</button>
      </Content>
    </Container>
  );
};

export default ProductItem;
