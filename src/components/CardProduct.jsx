import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class CardProduct extends React.Component {
  render() {
    const { listProduct, getPropsOfChildrens } = this.props;
    return (
      <div data-testid="product">
        <p>{listProduct.title}</p>
        <img
          src={ listProduct.thumbnail }
          alt={ listProduct.id }
        />
        {listProduct.shipping.free_shipping
        && <p data-testid="free-shipping"><strong>FRETE GRATIS GALERA!!!!</strong></p>}
        <p>{`preço: R$ ${listProduct.price}`}</p>
        <Link
          data-testid="product-detail-link"
          to={ `/productDetails/${listProduct.id}` }
        >
          Detalhes do produto
        </Link>
        <button
          data-testid="product-add-to-cart"
          type="button"
          onClick={ () => getPropsOfChildrens(listProduct) }
        >
          Adiciona ao Carrinho
        </button>

      </div>
    );
  }
}

CardProduct.propTypes = {
  listProduct: PropTypes.arrayOf(PropTypes.object.isRequired),
  getPropsOfChildrens: PropTypes.func.isRequired,
};

CardProduct.defaultProps = {
  listProduct: [],
};
