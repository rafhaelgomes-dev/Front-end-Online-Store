import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import ListProducts from './pages/ListProducts';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ ListProducts } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
