import { useRecoilValue, useSetRecoilState } from 'recoil';

import useProducts from 'hooks/useProducts';
import { productsState } from 'store/atoms';

const Products = () => {
  const setTodoList = useSetRecoilState(productsState);
  const products = useRecoilValue(productsState);
  const { isFetching } = useProducts(setTodoList);

  return (
    <>
      {isFetching && <span>loading...</span>}
      {products && products.map(product => <span key={product.id}>{product.title}</span>)}
    </>
  );
};

export default Products;
