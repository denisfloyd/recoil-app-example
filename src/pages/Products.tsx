import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import ProductItem from '@/components/ui/ProductItem';
import useProducts from '@/hooks/useProducts';
import { productsState } from '@/store/atoms';
import { productsListMergedWithCartState } from '@/store/selectors';
import { useEffect } from 'react';
import { Product } from '@/types/product';

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;

const Products = () => {
  const setProducts = useSetRecoilState(productsState);
  const { products } = useRecoilValue(productsListMergedWithCartState);
  const { data, isFetching } = useProducts();

  useEffect(() => {
    if (data && !isFetching) {
      setProducts(data);
    }
  }, [isFetching]);

  return (
    <Container>
      {isFetching && <span>loading...</span>}
      {products && products.map(product => <ProductItem key={product.id} product={product} />)}
    </Container>
  );
};

export default Products;
