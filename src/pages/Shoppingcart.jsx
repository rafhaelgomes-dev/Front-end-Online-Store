import React from 'react';
import PropTypes from 'prop-types';

export default class Shoppingcart extends React.Component {
  constructor() {
    super();
    this.state = {
      shoppingCartList: [],
      // buttonDisable: [],
    };
  }

  componentDidMount() {
    this.listAddState();
  }

     listAddState = () => {
       const { listItemsAdd } = this.props;
       this.setState({
         shoppingCartList: [...listItemsAdd],
       });
     }

    totalProducts = (id) => {
      const { listItemsAdd } = this.props;
      const newArray = [...listItemsAdd];
      const arrayFilter = newArray.filter((e) => e.id === id);
      return arrayFilter.length;
    };

    addNewProducts = (produt) => {
      this.setState((preventState) => (
        { shoppingCartList: [...preventState.shoppingCartList, produt] }));
    }

    // removeAddProducts = (id) => {
    //   const { listItemsAdd } = this.props;
    //   const { getPropsOfChildrensDelete } = this.props;
    //   const newArray = [...listItemsAdd];
    //   for (let index = 0; index < newArray.length; index += 1) {
    //     if (listItemsAdd[index].id === id) {
    //       newArray.splice(index, 1);
    //       const filter = newArray.filter((e) => e.id === id);
    //       if (filter.length <= 0) {
    //         return;
    //       }
    //       getPropsOfChildrensDelete(newArray);
    //       return;
    //     }
    //   }
    // }

    render() {
      const { listItemsAdd, getPropsOfChildrens } = this.props;
      // const { buttonDisable } = this.state;

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
                listItemsAdd
                  .map((listItemAdd, i) => (
                    <div key={ listItemAdd.id + i }>
                      <p data-testid="shopping-cart-product-name">{listItemAdd.title}</p>
                      <img
                        src={ listItemAdd.thumbnail }
                        alt={ listItemAdd.id }
                      />
                      <p>{`preço: R$ ${listItemAdd.price}`}</p>
                      <button
                        data-testid="product-increase-quantity"
                        type="button"
                        onClick={ () => getPropsOfChildrens(listItemAdd) }
                      >
                        ADD+
                        {' '}
                      </button>
                      {/* <button
                        data-testid="product-decrease-quantity"
                        disabled={ buttonDisable[i] }
                        type="button"
                        onClick={ () => this.removeAddProducts(listItemAdd.id) }
                      >
                        {' '}
                        REMOVE-
                        {' '}

                      </button> */}
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
  getPropsOfChildrens: PropTypes.func.isRequired,
  // getPropsOfChildrensDelete: PropTypes.func.isRequired,
};
