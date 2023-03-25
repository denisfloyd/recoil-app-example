import { MutableSnapshot, RecoilRoot } from 'recoil';

const RecoilProvider = ({
  children,
  initRecoilState,
}: {
  children: React.ReactNode;
  initRecoilState?: (mutatbleSnapshot: MutableSnapshot) => void;
}) => {
  return <RecoilRoot initializeState={initRecoilState}>{children}</RecoilRoot>;
};

export default RecoilProvider;
