import React, { Component } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

export default class Home extends Component {
  state = {
    products: [],
  }

  async componentDidMount() {
    const response = await api.get('products');

    const data = response.data.map(item => ({
      ...item,
      priceFormatted: formatPrice(item.price),
    }));

    this.setState({
      products: data,
    })
  }

  render() {
    const { products } = this.state;

    return (
      <ProductList>
        {products.map(({ id, title, priceFormatted, image }) => (
          <li key={id}>
            <img src={image} alt={title} />

            <strong>{title}</strong>

            <span>{priceFormatted}</span>

            <button type="button">
              <div>
                <MdAddShoppingCart size={16} color="#fff" /> 3
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        ))}
      </ProductList>
    );
  }
};
