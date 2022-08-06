import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductID } from '../services/api';

class ProductDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      listProducts: [],
      redirect: false,
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const fetchApi = await getProductID(id);
    this.setState({ listProducts: fetchApi });
  }

  redirectShoppingCart() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    /*  const { match: { params: { id } } } = this.props; */
    const { listProducts, redirect } = this.state;
    return (
      <div data-testid="product-detail-link">
        <p data-testid="product-detail-name">{listProducts.title}</p>
        <img data-testid="product-detail-image" src={ listProducts.thumbnail } alt="" />
        <p data-testid="product-detail-price">{`R$ ${listProducts.price}`}</p>
        <p>
          Especificações Técnicas
        </p>
        <ul>
          <li> especificação 1</li>
        </ul>
        <button
          data-testid="shopping-cart-button"
          type="button"
          onClick={ () => this.redirectShoppingCart() }
        >
          Carrinho de compras
        </button>
        {redirect ? <Redirect to="/shoppingcart" /> : null}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetails;
