import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import ProductItem from '@/components/ui/ProductItem';
import useProducts from '@/hooks/useProducts';
import { cartState, productsState } from '@/store/atoms';

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;

const Products = () => {
  const setProducts = useSetRecoilState(productsState);
  const cart = useRecoilValue(cartState);
  const products = useRecoilValue(productsState);
  const { isFetching } = useProducts(setProducts);

  return (
    <>
      {JSON.stringify(cart)}
      <Container>
        {isFetching && <span>loading...</span>}

        {products && products.map(product => <ProductItem key={product.id} product={product} />)}
      </Container>
    </>
  );
};

export default Products;
