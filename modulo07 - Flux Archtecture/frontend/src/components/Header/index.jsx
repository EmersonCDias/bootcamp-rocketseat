import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';

import { Container, Cart } from './styles';
import Logo from '../../assets/images/logo.svg';

const Header = ({ cartSize }) => {
  return (
    <Container>
      <Link to="/">
        <img src={Logo} alt="RocketShoes" />
      </Link>

      {console.log('cartSize', cartSize)}

      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <strong>{cartSize} items</strong>
        </div>

        <MdShoppingBasket size={36} color="#fff" />
      </Cart>
    </Container>
  );
};

Header.propTypes = {
  cartSize: PropTypes.number,
};

Header.defaultProps = {
  cartSize: 0,
};

export default connect(state => ({
  cartSize: state.cart.length,
}))(Header);
