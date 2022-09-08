import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Styles from './Shoppingcart.module.css';

export default class Shoppingcart extends React.Component {
  constructor() {
    super();
    this.state = {
      shoppingCartList: [],
      buttonDisable: [],
      produtosNumeros: [],
      paginaInicial: false,
    };
  }

  componentDidMount() {
    this.listAddState();
    this.getDbShoppingCartLocalStorage();
  }

     listAddState = () => {
       const dataBase = JSON.parse(localStorage.getItem('db_shoppingcart'))
      ?? [];
       this.setState({
         shoppingCartList: [...dataBase],
       });
     }

     redirectPaginaInicial = () => {
       this.setState({
         paginaInicial: true,
       });
     }

    getDbShoppingCartLocalStorage = () => {
      const dataBase = JSON.parse(localStorage.getItem('db_shoppingcart'))
      ?? [];
      const newArray = [...dataBase];
      newArray.forEach(() => {
        this.setState((preventState) => (
          { produtosNumeros: [...preventState.produtosNumeros, 1] }));
      });
    }

    totalProducts = (id) => {
      const { produtosNumeros } = this.state;
      const newArray = [...produtosNumeros];
      newArray[id] += 1;
      this.setState({
        produtosNumeros: [...newArray],
      });
    };

    addNewProducts = (produt) => {
      this.setState((preventState) => (
        { shoppingCartList: [...preventState.shoppingCartList, produt] }));
    }

    removeAddProducts = (id) => {
      const { produtosNumeros } = this.state;
      const newArray = [...produtosNumeros];
      if (newArray[id] <= 1) {
        return;
      }
      newArray[id] -= 1;
      this.setState({
        produtosNumeros: [...newArray],
      });
    }

    removerProduto = (i) => {
      const dataBase = JSON.parse(localStorage.getItem('db_shoppingcart'))
      ?? [];
      // const { getPropsOfChildrensDelete } = this.props;
      const newArray = [...dataBase];
      if (newArray.length < 1) {
        return;
      }
      newArray.splice(i, 1);
      localStorage.setItem('db_shoppingcart', JSON.stringify(newArray));
      this.setState({
        shoppingCartList: [...newArray],
      });
    }

    render() {
      // const { listItemsAdd } = this.props;
      const { buttonDisable, produtosNumeros,
        shoppingCartList, paginaInicial } = this.state;
      // const dataBase = JSON.parse(localStorage.getItem('db_shoppingcart'))
      // ?? [];
      return (
        <div>
          <header className="header">
            <h3>Front-end Online Store</h3>
            <div className="FormPesquisa" />
            <button
              className="buttonCarrinho"
              data-testid="shopping-cart-button"
              type="button"
              onClick={ () => this.redirectPaginaInicial() }
            >
              Página Inicial
            </button>
          </header>
          {paginaInicial ? <Redirect to="/" /> : null}
          {shoppingCartList.length === 0 ? (
            <div>
              <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            </div>
          ) : (
            <main className="shoppingCart">
              <div>
                {' '}
                <p className="pListadeProdutos">
                  Meu Carrinho de compras
                </p>

              </div>
              <div className="produtosShoppingCart">
                {
                  shoppingCartList
                    .map((listItemAdd, i) => (
                      <div key={ listItemAdd.id + i } className="CardProductShoppingCart">
                        <p
                          data-testid="shopping-cart-product-name"
                        >
                          {listItemAdd.title}

                        </p>
                        <img
                          src={ listItemAdd.thumbnail }
                          alt={ listItemAdd.id }
                        />
                        <p>{`preço: R$ ${listItemAdd.price}`}</p>
                        <div>
                          <button
                            data-testid="product-increase-quantity"
                            type="button"
                            disabled={ produtosNumeros.some((maxQuanty) => (
                              maxQuanty >= listItemAdd.available_quantity)) }
                            onClick={ () => this
                              .totalProducts(i) }
                          >
                            +
                          </button>
                          <button
                            data-testid="product-decrease-quantity"
                            disabled={ buttonDisable[i] }
                            type="button"
                            onClick={ () => this.removeAddProducts(i) }
                          >
                            -
                          </button>
                        </div>
                        <button
                          data-testid="remove-product"
                          onClick={ () => this.removerProduto(i) }
                          type="submit"
                        >
                          Remover Produto
                        </button>
                        <p data-testid="shopping-cart-product-quantity">
                          {`quantidade: ${produtosNumeros[i]}`}
                        </p>
                      </div>
                    ))
                }
              </div>
              <div className="buttonFinalizarCompra">
                {shoppingCartList.length > 0
          && <Link className="checkout-products" to="/checkout">Finalizar Compra</Link>}
              </div>
            </main>
          )}
        </div>
      );
    }
}

Shoppingcart.propTypes = {
  listItemsAdd: PropTypes.shape({
    map: PropTypes.func.isRequired,
    length: PropTypes.func.isRequired,
  }).isRequired,
};
