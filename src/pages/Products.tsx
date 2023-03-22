import ProductItem from 'components/ui/ProductItem';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import useProducts from 'hooks/useProducts';
import { productsState } from 'store/atoms';
import styled from 'styled-components';

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;

const Products = () => {
  const setTodoList = useSetRecoilState(productsState);
  const products = useRecoilValue(productsState);
  const { isFetching } = useProducts(setTodoList);

  return (
    <Container>
      {isFetching && <span>loading...</span>}
      {products && products.map(product => <ProductItem key={product.id} product={product} />)}
    </Container>
  );
};

export default Products;
