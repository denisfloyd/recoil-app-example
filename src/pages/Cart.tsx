import { cartState } from '@/store/atoms';
import { useRecoilValue } from 'recoil';

const Cart = () => {
  const cart = useRecoilValue(cartState);

  return <span>{cart.totalCart}</span>;
};

export default Cart;
