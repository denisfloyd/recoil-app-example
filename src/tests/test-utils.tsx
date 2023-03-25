import { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

import { MutableSnapshot } from 'recoil';
import QueryProvider from '@/components/providers/QueryProvider';
import RecoilProvider from '@/components/providers/RecoilProvider';

const wrapper: FC<{
  children: React.ReactNode;
  initRecoilState?: (mutablesnapshot: MutableSnapshot) => void;
}> = ({ children, initRecoilState }) => (
  <QueryProvider>
    <RecoilProvider initRecoilState={initRecoilState}>{children}</RecoilProvider>
  </QueryProvider>
);

const customRender = (
  ui: ReactElement,
  initRecoilState?: (mutablesnapshot: MutableSnapshot) => void,
  options?: Omit<RenderOptions, 'wrapper'>,
) =>
  render(ui, {
    wrapper: ({ children }) => wrapper({ children: children as React.ReactNode, initRecoilState }),
    ...options,
  });

export * from '@testing-library/react';
export { customRender as render };
