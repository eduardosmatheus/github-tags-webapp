import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Home from './containers/Home';
import Login from './containers/Login';
import SignUp from './containers/SignUp';

function App() {
  return (
    <div className="main-app-container">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
