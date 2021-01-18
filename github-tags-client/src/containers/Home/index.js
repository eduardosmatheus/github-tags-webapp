import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPowerOff, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { withUser } from '../../components/UserProvider';
import Styles from './Home.module.scss';
import Repositories from '../Repositories';
import Tags from '../Tags';

class Home extends Component {
  componentDidMount() {
    const { history, location, claimAccess, isLogged } = this.props;
    if (!isLogged && !location.search) {
      history.push('/login');
      return;
    } else if (!isLogged && location.search) {
      const parameters = new URLSearchParams(location.search);
      const code = parameters.get('code');
      if (!code) {
        this.handleLogout();
      } else {
        claimAccess(code);
      }
    } else if (isLogged && location.search) {
      history.push('/');
    }
  }

  componentDidUpdate(prevProps) {
    const { user, history } = this.props;
    if (prevProps.user !== user && user) {
      history.replace('/');
    }
  }

  handleLogout = () => {
    this.props.logout();
    this.props.history.push('/login');
  }

  renderUserInfo = () => {
    const { user } = this.props;
    if (!user) {
      return <FontAwesomeIcon icon={faSpinner} spin />;
    }
    const { username, avatarURL } = user;
    return (
      <>
        <img className={Styles.UserLogo} src={avatarURL} alt={username} />
        {' '}
        {username}
      </>
    )
  }

  render() {
    return (
      <>
        <Navbar expand="lg" bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/">
            <FontAwesomeIcon icon={faHome} />
          </Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/repositories">
              Meus Repositórios
            </Nav.Link>
            <Nav.Link as={Link} to="/tags">Tags</Nav.Link>
          </Nav>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <NavDropdown title={this.renderUserInfo()}>
                <NavDropdown.Item onSelect={this.handleLogout}>
                  <FontAwesomeIcon icon={faPowerOff} />
                  {' '}
                  Sair
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="main-app-container">
          <Switch>
            <Route path="/repositories" component={Repositories} />
            <Route path="/tags" exact component={Tags} />
          </Switch>
        </div>
      </>
    )
  }
}

export default withUser(Home);