import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { withUser } from '../../components/UserProvider';
import Styles from './Home.module.scss';

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

  renderLoadingIcon = () => (
    <FontAwesomeIcon icon={faSpinner} spin />
  )

  renderUserInfo = () => {
    const { user } = this.props;
    const { login, avatar_url } = user;
    return (
      <>
        <img className={Styles.UserLogo} src={avatar_url} alt={login} />
        {' '}
        {login}
      </>
    )
  }

  render() {
    const { user } = this.props;
    return (
      <>
        <Navbar expand="lg" bg="dark" variant="dark">
          <Navbar.Brand>Buscador de Tags</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <NavDropdown title={!user ? this.renderLoadingIcon() : this.renderUserInfo()}>
                <NavDropdown.Item onSelect={this.handleLogout}>
                  <FontAwesomeIcon icon={faPowerOff} />
                  {' '}
                  Sair
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container fluid>
          <h1>Bem vindo à Home! Aqui você poderá fazer buscas.</h1>
        </Container>
      </>
    )
  }
}

export default withUser(Home);