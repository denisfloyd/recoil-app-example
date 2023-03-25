import { FC, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';

import Providers from '@/components/providers';

const wrapper: FC<{ children: React.ReactNode }> = ({ children }) => (
  <Providers>{children}</Providers>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper, ...options });

export * from '@testing-library/react';
export { customRender as render };
