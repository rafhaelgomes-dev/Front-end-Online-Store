import React, { Component } from 'react';

export default class ListProducts extends Component {
  state = {
    listProducts: [],
  }

  render() {
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
      </div>
    );
  }
}
