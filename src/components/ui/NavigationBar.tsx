import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

const CustomLink = styled(Link)`
  border: 1px solid #fff;
  border-radius: 2px;
  padding: 5px;
  color: #fff;
  transition: 0.2s all ease-in;

  &:hover {
    border-color: #646cff;
    color: #fff;
  }
`;

const NavigationBar = () => {
  const showBackButton = useMatch('/cart');
  const showGoToCartButton = useMatch('/');

  return (
    <Container>
      {showBackButton ? <CustomLink to="/">back</CustomLink> : null}
      {showGoToCartButton ? <CustomLink to="/cart">Go to Cart</CustomLink> : null}
    </Container>
  );
};

export default NavigationBar;
