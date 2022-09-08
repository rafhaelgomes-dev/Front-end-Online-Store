import React from 'react';
import PropTypes from 'prop-types';
import styles from './CardProduct.module.css';

export default class CardProduct extends React.Component {
  render() {
    const { listProduct, getPropsOfChildrens } = this.props;
    return (
      <div className={ styles.cardProduct }>
        <img
          src={ listProduct.thumbnail }
          alt={ listProduct.id }
        />
        <p>{listProduct.title}</p>
        {listProduct.shipping.free_shipping
        && <p data-testid="free-shipping"><strong>FRETE GRATIS</strong></p>}
        <p>{`preço: R$ ${listProduct.price}`}</p>
        <button
          className="buttonAddCart"
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
