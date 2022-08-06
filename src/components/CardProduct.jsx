import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CardProduct extends React.Component {
  render() {
    const { listProduct } = this.props;
    return (
      <div data-testid="product">
        <p>{listProduct.title}</p>
        <img
          src={ listProduct.thumbnail }
          alt={ listProduct.id }
        />
        <p>{`preço: R$ ${listProduct.price}`}</p>
        <Link
          data-testid="product-detail-link"
          to={ `/productDetails/${listProduct.id}` }
        >
          Detalhes do produto
        </Link>
      </div>
    );
  }
}

CardProduct.propTypes = {
  listProduct: PropTypes.objectOf.isRequired,
};
