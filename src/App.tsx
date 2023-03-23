import { useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { Outlet, Route, Routes } from 'react-router-dom';

import Products from '@/pages/Products';
import { createDispatcher, Dispatcher } from '@/store/dispatcher';
import { dispatcherState } from '@/store/atoms';
import NavigationBar from './components/ui/NavigationBar';
import Cart from './pages/Cart';

function App() {
  const setDispatcher = useSetRecoilState(dispatcherState);

  const dispatcherRef = useRef<Dispatcher>(createDispatcher());
  useEffect(() => {
    setDispatcher(dispatcherRef.current);
  }, []);

  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<LayoutRoot />}>
          <Route index element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Products />} />
        </Route>
      </Routes>
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
