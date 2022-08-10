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
    const { quantidade, quantidade2 } = this.props;
    const { quantidadeCarrinho } = this.state;
    console.log(quantidade);
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
  quantidade: PropTypes.arrayOf.isRequired,
  quantidade2: PropTypes.arrayOf.isRequired,
};
