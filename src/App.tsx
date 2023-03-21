import styled from 'styled-components';
import { Outlet, Route, Routes } from 'react-router-dom';

import Products from 'pages/Products';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LayoutRoot />}>
        <Route index element={<Products />} />
        <Route path="*" element={<Products />} />
      </Route>
    </Routes>
  );
}

function LayoutRoot() {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

export default App;
