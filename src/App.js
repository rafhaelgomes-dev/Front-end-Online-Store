import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import ListProducts from './pages/ListProducts';
import ProductDetails from './pages/ProductDetails';
import Shoppingcart from './pages/Shoppingcart';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ ListProducts } />
            <Route exact path="/shoppingcart" component={ Shoppingcart } />
            <Route exact path="/productDetails/:id" component={ ProductDetails } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
