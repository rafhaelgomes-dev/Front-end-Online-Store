import React from 'react';

export default class QuantOfProductsCart extends React.Component {
  render() {
    const dataBase = JSON.parse(localStorage.getItem('db_shoppingcart'));
    if (dataBase === null) {
      return <span>0</span>;
    }
    return (
      <div>
        <span data-testid="shopping-cart-size">
          {dataBase.length}
        </span>
      </div>
    );
  }
}
