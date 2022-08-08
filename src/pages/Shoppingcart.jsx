import React from 'react';
import PropTypes from 'prop-types';

export default class Shoppingcart extends React.Component {
  constructor() {
    super();
    this.state = {
      shoppingCartList: [],
      productsArray: [],
      buttonDisable: false,
    };
  }

  componentDidMount() {
    this.listAddState();
  }

     listAddState = () => {
       const { listItemsAdd } = this.props;
       this.setState({
         productsArray: [...listItemsAdd],
         shoppingCartList: [...listItemsAdd],
       });
     }

    totalProducts = (id) => {
      const { productsArray } = this.state;
      const arrayFilter = productsArray.filter((e) => e.id === id);
      return arrayFilter.length;
    };

    addNewProducts = (produt) => {
      this.setState((preventState) => (
        { productsArray: [...preventState.productsArray, produt] }));
    }

    removeAddProducts = (id) => {
      const { productsArray } = this.state;
      const newArray = [...productsArray];
      console.log(newArray);
      for (let index = 0; index < newArray.length; index += 1) {
        if (productsArray[index].id === id) {
          newArray.splice(index, 1);
          // console.log(newArray);
        }
        this.setState(
          { productsArray: [...newArray] },
        );
        break;
      }
    }

    render() {
      const { listItemsAdd } = this.props;
      const { shoppingCartList, buttonDisable } = this.state;

      return (
        <div>
          {listItemsAdd.length === 0 ? (
            <p data-testid="shopping-cart-empty-message">Seu carrinho está  vazio</p>
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
                        {this.totalProducts(listItemAdd.id)}
                      </p>
                      <button
                        type="button"
                        onClick={ () => this
                          .addNewProducts(listItemAdd) }
                      >
                        ADD+
                        {' '}

                      </button>
                      <button
                        disabled={ buttonDisable }
                        type="button"
                        onClick={ () => this.removeAddProducts(listItemAdd.id) }
                      >
                        {' '}
                        REMOVE-
                        {' '}

                      </button>
                    </div>
                  ))
              }
              <p data-testid="shopping-cart-product-quantity">
                {`quantidade: ${listItemsAdd.length}`}
              </p>

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
};
