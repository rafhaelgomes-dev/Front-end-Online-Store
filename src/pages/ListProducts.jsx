import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import Category from '../components/Category';
import CardProduct from '../components/CardProduct';
import QuantOfProductsCart from '../components/QuantOfProductsCart';

export default class ListProducts extends Component {
  constructor() {
    super();
    this.state = {
      listProducts: [],
      inputSearch: '',
      button: false,
      listCategories: [],
      redirect: false,
      // quantidadeDeProdutos: [],
    };
  }

  componentDidMount = async () => {
    const categories = await getCategories();
    this.setState({ listCategories: categories });
    this.handleSearchButtonCategory('MLB5726', undefined);
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

  handleSearchButtonCategory = async (id) => {
    const fetchApi = await getProductsFromCategoryAndQuery(id, undefined);
    this.setState({ listProducts: fetchApi.results, button: true });
  }

  redirectShoppingCart() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { listProducts, inputSearch, button, listCategories, redirect } = this.state;
    // const { quantidadeDeProdutos } = this.state;
    const { getPropsOfChildrens, listItemsAdd, quantidade2 } = this.props;
    return (
      <div className="listProduct">
        <header className="header">
          <h3>Front-end Online Store</h3>
          <div className="FormPesquisa" />
          <button
            className="buttonCarrinho"
            data-testid="shopping-cart-button"
            type="button"
            onClick={ () => this.redirectShoppingCart() }
          >
            Carrinho de compras
            <QuantOfProductsCart
              data-testid="shopping-cart-size"
              quantidade2={ quantidade2 }
              quantidade={ listItemsAdd }
            />
          </button>
        </header>
        <div className="divform">
          <input
            name="inputSearch"
            className="inputSearch"
            value={ inputSearch }
            onChange={ this.handleChange }
            placeholder="Pesquisar"
            data-testid="query-input"
            type="text"
          />
          <button
            type="button"
            className="buttonSearch"
            data-testid="query-button"
            onClick={ this.handleSearchButton }
          >
            Pesquisar
          </button>
          {
            !button
              ? (
                <p data-testid="home-initial-message">
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </p>
              ) : !listProducts.length && <p>Nenhum produto foi encontrado</p>
          }
        </div>
        <div className="sectionMain">
          <div className="categorias">
            <h2>Categorias</h2>
            {listCategories.map(({ id, name }) => (
              <Category
                key={ id }
                btnName={ name }
                onClick={ () => this.handleSearchButtonCategory(id) }
              />
            ))}
          </div>
          {
            button && (
              <div className="divDosProdutos">
                {
                  listProducts.map((listProduct, index) => (
                    <CardProduct
                      key={ listProduct.id }
                      listProduct={ listProduct }
                      index={ index }
                      getPropsOfChildrens={ getPropsOfChildrens }
                    />
                  ))
                }
              </div>
            )

          }
        </div>
        {redirect ? <Redirect to="/shoppingcart" /> : null}
      </div>
    );
  }
}

ListProducts.propTypes = {
  getPropsOfChildrens: PropTypes.func.isRequired,
  listItemsAdd: PropTypes.arrayOf.isRequired,
  quantidade2: PropTypes.arrayOf.isRequired,
};
