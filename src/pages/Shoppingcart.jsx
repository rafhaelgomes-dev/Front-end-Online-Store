import React from 'react';
import PropTypes from 'prop-types';

export default class Shoppingcart extends React.Component {
  constructor() {
    super();
    this.state = {
      shoppingCartList: [],
      buttonDisable: [],
      produtosNumeros: [],
    };
  }

  componentDidMount() {
    this.listAddState();
    this.teste();
  }

     listAddState = () => {
       const { listItemsAdd } = this.props;
       this.setState({
         shoppingCartList: [...listItemsAdd],
       });
     }

    teste = () => {
      const { listItemsAdd } = this.props;
      const newArray = [...listItemsAdd];
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
      const { shoppingCartList } = this.state;
      // const { getPropsOfChildrensDelete } = this.props;
      const newArray = [...shoppingCartList];
      if (newArray.length <= 1) {
        return;
      }
      newArray.splice(i, 1);
      this.setState({
        shoppingCartList: [...newArray],
      });
    }

    render() {
      // const { listItemsAdd } = this.props;
      const { buttonDisable, produtosNumeros, shoppingCartList } = this.state;

      return (
        <div>
          {shoppingCartList.length === 0 ? (
            <div>
              <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            </div>
          ) : (
            <div>
              <p>
                lista de Produtos
              </p>
              {
                shoppingCartList
                  .map((listItemAdd, i) => (
                    <div key={ listItemAdd.id + i }>
                      <p data-testid="shopping-cart-product-name">{listItemAdd.title}</p>
                      <img
                        src={ listItemAdd.thumbnail }
                        alt={ listItemAdd.id }
                      />
                      <p>{`preço: R$ ${listItemAdd.price}`}</p>
                      <p>
                        Total:
                        {' '}
                        {produtosNumeros[i]}
                      </p>
                      <button
                        data-testid="product-increase-quantity"
                        type="button"
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
                      <button
                        data-testid="remove-product"
                        onClick={ () => this.removerProduto(i) }
                        type="button"
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
  // getPropsOfChildrensDelete: PropTypes.func.isRequired,
};
