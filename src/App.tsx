import styled from 'styled-components';
import { Outlet, Route, Routes } from 'react-router-dom';

import Products from '@/pages/Products';
import NavigationBar from './components/ui/NavigationBar';
import Cart from './pages/Cart';
import { CartDispatchProvider } from './hooks/useCartDispatch';

function App() {
  return (
    <>
      <NavigationBar />
      <CartDispatchProvider>
        <Routes>
          <Route path="/" element={<LayoutRoot />}>
            <Route index element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<Products />} />
          </Route>
        </Routes>
      </CartDispatchProvider>
    </>
  );
}

function LayoutRoot() {
  return (
    <Wrapper>
      <Outlet />
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
