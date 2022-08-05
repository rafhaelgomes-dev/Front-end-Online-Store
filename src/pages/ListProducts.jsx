import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from '../services/api';

export default class ListProducts extends Component {
  constructor() {
    super();
    this.state = {
      listProducts: [],
      inputSearch: '',
      button: false,
    };
  }

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({ [name]: value });
  }

  handleSearchButton = async () => {
    const { inputSearch } = this.state;
    const fetchApi = await getProductsFromCategoryAndQuery('', inputSearch);
    this.setState({ listProducts: fetchApi.results, button: true });
  }

  render() {
    const { listProducts, inputSearch, button } = this.state;
    return (
      <div>
        <input
          name="inputSearch"
          value={ inputSearch }
          onChange={ this.handleChange }
          placeholder="pesquisa"
          data-testid="query-input"
          type="text"
        />
        <button
          type="button"
          data-testid="query-button"
          onClick={ this.handleSearchButton }
        >
          pesquisar
        </button>
        {
          !button
            ? (
              <p data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </p>
            ) : !listProducts.length && <p>Nenhum produto foi encontrado</p>
        }
        {
          button && (
            listProducts.map((listProduct) => (
              <div key={ listProduct.id } data-testid="product">
                <p>{listProduct.title}</p>
                <img
                  src={ listProduct.thumbnail }
                  alt={ listProduct.id }
                />
                <p>{`preço: R$ ${listProduct.price}`}</p>
              </div>
            ))
          )
        }
      </div>
    );
  }
}
