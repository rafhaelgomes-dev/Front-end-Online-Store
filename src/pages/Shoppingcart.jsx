import React from 'react';
import PropTypes from 'prop-types';

export default class Shoppingcart extends React.Component {
  render() {
    const { listItemsAdd } = this.props;
    return (
      <div>
        {listItemsAdd.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
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
                    <p
                      data-testid="shopping-cart-product-quantity"
                    >
                      {`quantidade: ${listItemsAdd.length}`}
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
};
