import React, { Component } from 'react';
import Category from '../components/Category';
import { getCategories } from '../services/api';

export default class ListProducts extends Component {
  constructor() {
    super();
    this.state = {
      listProducts: [],
      listCategories: [],
    };
  }

  componentDidMount = async () => {
    const categories = await getCategories();
    this.setState({ listCategories: categories });
  }

  render() {
    const { listProducts, listCategories } = this.state;
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
        <div>
          <h2>Categorias</h2>
          {listCategories.map(({ id, name }) => (
            <Category
              key={ id }
              btnName={ name }
            />
          ))}
        </div>
      </div>
    );
  }
}
