import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPowerOff, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Card, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { withUser } from '../../components/UserProvider';
import Styles from './Home.module.scss';
import api from '../../api';
import RepositoryList from './RepositoryList';

class Home extends Component {
  
  state = {
    repositories: []
  }

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
    this.handleLoadRepositories();
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

  handleLoadRepositories = async () => {
    try {
      const { data: repositories } = await api.get('/api/github/starred-repos');
      this.setState({ repositories });
    } catch (error) {
      toast.error(error.message);
    }
  }

  renderLoadingIcon = () => (
    <FontAwesomeIcon icon={faSpinner} spin />
  )

  renderUserInfo = () => {
    const { user } = this.props;
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
    const { user } = this.props;
    const { repositories } = this.state;
    return (
      <>
        <Navbar expand="lg" bg="dark" variant="dark">
          <Navbar.Brand>
            <FontAwesomeIcon icon={faHome} />
          </Navbar.Brand>
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
        <h1>Meus repositórios</h1>
        <RepositoryList {...{ repositories }} />
      </>
    )
  }
}

export default withUser(Home);