import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ListProducts from './pages/ListProducts';

function App() {
  return (
    <div className="App">

      <Switch>
        <Route exact path="/" component={ ListProducts } />
      </Switch>
    </div>
  );
}

export default App;
