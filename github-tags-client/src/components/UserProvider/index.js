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
      const { data: user } = await api.get('/api/users/current');
      this.setState({ user, isLogged: true });
    } catch (error) {
      
    }
  }

  claimAccess = async (authCode) => {
    try {
      const { data: claims } = await api.post('/api/users/claim-access', null, {
        params: { code: authCode }
      });
      this.login(claims.access_token);
    } catch (error) {
      this.logout();
    }
  }

  login = (token) => {
    localStorage.setItem('githubTags.accessToken', token);
    this.getCurrentUser();
  }

  logout = () => {
    localStorage.removeItem('githubTags.accessToken');
    this.setState({ isLogged: false, user: null });
  }

  render() {
    const { children } = this.props;
    const context = {
      login: this.login,
      claimAccess: this.claimAccess,
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
  return localStorage.getItem('githubTags.accessToken');
}
