import React from 'react';

export default class Shoppingcart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartProduct: undefined,
    };
  }

  render() {
    const { cartProduct } = this.state;
    return (
      <div>
        {cartProduct === undefined ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        ) : <p>lista de Produtos</p>}
      </div>
    );
  }
}
