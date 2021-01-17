import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './containers/Home';
import Login from './containers/Login';

function App() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Home} />
    </Switch>
  );
}

export default App;
