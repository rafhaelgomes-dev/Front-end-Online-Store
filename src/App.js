import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import Checkout from './pages/Checkout';
import ListProducts from './pages/ListProducts';
import ProductDetails from './pages/ProductDetails';
import Shoppingcart from './pages/Shoppingcart';

class App extends React.Component {
  state = {
    listItemsAdd: [],
    quantidade2: [],
  }

  getPropsOfChildrens= (param) => {
    this.setState((preventState) => (
      { listItemsAdd: [...preventState.listItemsAdd, param] }));
    const dataBase = JSON.parse(localStorage.getItem('db_shoppingcart'))
 ?? [];
    dataBase.push(param);
    localStorage.setItem('db_shoppingcart', JSON.stringify(dataBase));
    this.setState(() => (
      { quantidade2: [...dataBase] }));
  }

  getPropsOfChildrensDelete= (param) => {
    this.setState(() => (
      { listItemsAdd: [...param] }));
  }

  render() {
    const { listItemsAdd, quantidade2 } = this.state;
    return (
      <div className="App">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route
              exact
              path="/"
              render={ () => (<ListProducts
                quantidade2={ quantidade2 }
                listItemsAdd={ listItemsAdd }
                getPropsOfChildrens={ this.getPropsOfChildrens }
              />) }
            />
            <Route
              exact
              path="/shoppingcart"
              render={ () => (<Shoppingcart
                listItemsAdd={ listItemsAdd }
                getPropsOfChildrens={ this.getPropsOfChildrens }
                getPropsOfChildrensDelete={ this.getPropsOfChildrensDelete }
              />) }
            />
            <Route
              exact
              path="/productDetails/:id"
              render={ (props) => (<ProductDetails
                { ...props }
                quantidade2={ quantidade2 }
                listItemsAdd={ listItemsAdd }
                getPropsOfChildrens={ this.getPropsOfChildrens }
              />) }
            />
            <Route
              exact
              path="/checkout"
              component={ Checkout }
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
