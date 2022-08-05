import React, { Component } from 'react';
import { Redirect } from 'react-router-dom/';

export default class ListProducts extends Component {
  constructor() {
    super();
    this.state = {
      listProducts: [],
      redirect: false,
    };
  }

  redirectShoppingCart() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { redirect } = this.state;
    const { listProducts } = this.state;
    return (
      <div>
        <h1>Lista de Produtos</h1>
        {
          !listProducts.length
        && (
          <p data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </p>
        )
        }
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
