import useProducts from 'hooks/useProducts';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

function App() {
  const [count, setCount] = useState(0);

  const { data: products, isFetching } = useProducts();

  return (
    <Wrapper>
      {isFetching && <span>loading...</span>}
      {products && products.map(product => <span>{product.title}</span>)}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

export default App;
