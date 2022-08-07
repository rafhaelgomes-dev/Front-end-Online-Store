import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import ListProducts from './pages/ListProducts';
import ProductDetails from './pages/ProductDetails';
import Shoppingcart from './pages/Shoppingcart';

class App extends React.Component {
  state = {
    listItemsAdd: [],
  }

  getPropsOfChildrens= (param) => {
    this.setState((preventState) => (
      { listItemsAdd: [...preventState.listItemsAdd, param] }));
  }

  render() {
    const { listItemsAdd } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={ () => (<ListProducts
                getPropsOfChildrens={ this.getPropsOfChildrens }
              />) }
            />
            <Route
              exact
              path="/shoppingcart"
              render={ () => <Shoppingcart listItemsAdd={ listItemsAdd } /> }
            />
            <Route exact path="/productDetails/:id" component={ ProductDetails } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
