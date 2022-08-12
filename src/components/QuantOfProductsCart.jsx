import React from 'react';
import PropTypes from 'prop-types';

export default class QuantOfProductsCart extends React.Component {
  constructor() {
    super();
    this.state = {
      quantidadeCarrinho: [],
    };
  }

  componentDidMount() {
    const dataBase = JSON.parse(localStorage.getItem('db_shoppingcart'))
    ?? [];
    this.setState(() => (
      { quantidadeCarrinho: [...dataBase] }));
  }

  render() {
    const { quantidade2 } = this.props;
    const { quantidadeCarrinho } = this.state;
    return (
      <div>
        <span data-testid="shopping-cart-size">
          {quantidade2.length < 1 ? quantidadeCarrinho.length
            : (
              quantidade2.length
            )}
        </span>
      </div>
    );
  }
}

QuantOfProductsCart.propTypes = {
  quantidade2: PropTypes.arrayOf.isRequired,
};
