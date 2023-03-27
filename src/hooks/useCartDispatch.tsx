import React, { createContext, ReactNode, useContext, useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';

import { createDispatcher, Dispatcher } from '@/store/dispatcher';
import { dispatcherState } from '@/store/atoms';

interface Props {
  children: ReactNode;
}

const CartDispatchContext = createContext({});

export function CartDispatchProvider({ children }: Props): JSX.Element {
  const setDispatcher = useSetRecoilState(dispatcherState);

  const dispatcherRef = useRef<Dispatcher>(createDispatcher());
  useEffect(() => {
    setDispatcher(dispatcherRef.current);
  }, []);

  return <CartDispatchContext.Provider value={{}}>{children}</CartDispatchContext.Provider>;
}
