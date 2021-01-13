import React from 'react';
import api from '../../api';

const { Provider, Consumer } = React.createContext();

export class UserProvider extends React.Component {

  state = {
    user: null,
    isLogged: !!getAccessToken()
  }

  async componentDidMount() {
    const currentToken = getAccessToken();
    if (currentToken) {
      this.getCurrentUser();
    }
  }

  getCurrentUser = async () => {
    try {
      const { data: user } = await api.get('/users/current');
      this.setState({ user });
    } catch (error) {
      
    }
  }

  claimAccess = async (authCode) => {
    const { data: claims } = await api.post('/users/claim-access', null, {
      params: { code: authCode }
    });
    this.login(claims.access_token);
  }

  login = (token) => {
    localStorage.setItem('access_token', token);
    this.getCurrentUser();
  }

  logout = () => {
    localStorage.removeItem('access_token');
    this.setState({ isLogged: false, user: null });
  }

  render() {
    const { children } = this.props;
    const context = {
      login: this.claimAccess,
      logout: this.logout,
      ...this.state,
    }
    return <Provider value={context}>{children}</Provider>;
  }
}

export function withUser(Component) {
  return function UserComponent(props) {
    return (
      <Consumer>
        {context => <Component {...props} {...context} />}
      </Consumer>
    );
  };
}

export function getAccessToken() {
  return localStorage.getItem('access_token');
}
