import QueryProvider from './QueryProvider';
import RecoilProvider from './RecoilProvider';

const Providers = ({ children }) => {
  return (
    <QueryProvider>
      <RecoilProvider>{children}</RecoilProvider>
    </QueryProvider>
  );
};

export default Providers;
