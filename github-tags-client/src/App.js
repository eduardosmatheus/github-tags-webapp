import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.scss';
import AppNavbar from './components/AppNavbar';
import { withUser } from './components/UserProvider';
import Login from './pages/Login';
import Repositories from './pages/Repositories';
import Tags from './pages/Tags';

class App extends React.Component {
  componentDidMount() {
    const { history, location, claimAccess, isLogged } = this.props;
    if (!isLogged && location && !location.search) {
      history.push('/login');
      return;
    } else if (!isLogged && location && location.search) {
      const parameters = new URLSearchParams(location.search);
      const code = parameters.get('code');
      if (!code) {
        this.handleLogout();
      } else {
        claimAccess(code);
      }
    } else if (isLogged && location && location.search) {
      history.push('/repositories');
    }
  }

  componentDidUpdate(prevProps) {
    const { user, history } = this.props;
    if (prevProps.user !== user && user) {
      history.replace('/repositories');
    }
  }
  render() {
    return (
      <div className="main-app-container">
        <AppNavbar />
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/repositories" exact component={Repositories} />
          <Route path="/tags" exact component={Tags} />
        </Switch>
        <ToastContainer />
      </div>
    );
  }
}

export default withRouter(withUser(App));
