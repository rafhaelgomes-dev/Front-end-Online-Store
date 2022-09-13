import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import Category from '../components/Category';
import CardProduct from '../components/CardProduct';
import QuantOfProductsCart from '../components/QuantOfProductsCart';
import styles from './ListProduct.module.css';
import Lupa from '../assets/Vector.png';
import Logo from '../assets/logo.png';
import Carrinho from '../assets/carrinho.png';

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
    // this.handleSearchButtonCategory('MLB5726', undefined);
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
      <div className={ styles.listProduct }>
        <header className={ styles.header }>
          <div className="divform">
            <input
              name="inputSearch"
              className={ styles.inputSearch }
              value={ inputSearch }
              onChange={ this.handleChange }
              placeholder="Pesquisar"
              data-testid="query-input"
              type="text"
            />
            <button
              type="button"
              className={ styles.buttonSearch }
              data-testid="query-button"
              onClick={ this.handleSearchButton }
            >
              <img src={ Lupa } alt="botão de pesquisar" className={ styles.imgLupa } />
            </button>
          </div>
          <div className={ styles.logo }>
            <img src={ Logo } alt="logo front end online store" />
          </div>
          <button
            className={ styles.carrinho }
            data-testid="shopping-cart-button"
            type="button"
            onClick={ () => this.redirectShoppingCart() }
          >
            <img src={ Carrinho } alt="carrinho de compras" />
            <div className={ styles.numeroCarrinho }>
              <QuantOfProductsCart
                quantidade2={ quantidade2 }
                quantidade={ listItemsAdd }
              />
            </div>
          </button>
        </header>
        <div className={ styles.sectionMain }>
          <div className={ styles.categorias }>
            <h2>Categorias</h2>
            <div className={ styles.borda } />
            {listCategories.map(({ id, name }) => (
              <Category
                key={ id }
                btnName={ name }
                onClick={ () => this.handleSearchButtonCategory(id) }
              />
            ))}
          </div>
          {
            !button
              ? (
                <div className={ styles.pDigiteAlgumTermo }>
                  <h1>
                    Você ainda não
                    <br />
                    realizou uma busca
                  </h1>
                  <p>
                    Digite algum termo de pesquisa ou
                    <br />
                    escolha uma categoria.
                  </p>
                </div>
              ) : !listProducts.length && <p>Nenhum produto foi encontrado</p>
          }
          {
            button && (
              <div className={ styles.divDosProdutos }>
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
