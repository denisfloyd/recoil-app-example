import { RecoilRoot } from 'recoil';

const RecoilProvider = ({ children, initRecoilState }) => {
  return <RecoilRoot initializeState={initRecoilState}>{children}</RecoilRoot>;
};

export default RecoilProvider;
