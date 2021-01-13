import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';
import { withUser } from '../../components/UserProvider';

class Home extends Component {
  
  componentDidMount() {
    const { history, location, login, isLogged } = this.props;
    if (!isLogged && !location.search) {
      history.push('/login');
      return;
    } else if (!isLogged && location.search) {
      const parameters = new URLSearchParams(location.search);
      const code = parameters.get('code');
      if (!code) {
        this.handleLogout();
      } else {
        login(code);
      }
    } else if (isLogged && location.search) {
      history.push('/');
    }
  }

  handleLogout = () => {
    this.props.logout();
    this.props.history.push('/login');
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>Bem vindo à Home! Aqui você poderá fazer buscas.</h1>
        <p>Abaixo tem o usuário Logado:</p>
        <h2>{user && JSON.stringify(user)}</h2>
        <Button variant="danger" onClick={this.handleLogout}>
          <FontAwesomeIcon icon={faPowerOff} />
          {' '}
          Logout
        </Button>
      </div>
    )
  }
}

export default withUser(Home);