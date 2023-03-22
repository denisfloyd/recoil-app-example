import styled from 'styled-components';
import { Product } from 'types/product';

const Container = styled.div`
  width: 300px;
  border-radius: 2px;
  border: 1px solid #fff;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

interface Props {
  product: Product;
}

const ProductItem = ({ product }: Props) => {
  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  }).format(product.price);

  return (
    <Container>
      <h3>{product.title}</h3>

      <Content>
        <span>{price}</span>
        <button>Buy</button>
      </Content>
    </Container>
  );
};

export default ProductItem;
