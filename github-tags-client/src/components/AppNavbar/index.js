import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { withUser } from '../UserProvider';

function AppNavbar({ user, logout, history }) {
  const renderUserInfo = () => {
    if (!user) {
      return <FontAwesomeIcon icon={faSpinner} spin />;
    }
    const { username, avatarURL } = user;
    return (
      <>
        <img
          style={{ width: '30px', height: '30px', borderRadius: '30px' }}
          src={avatarURL}
          alt={username}
        />
        {' '}
        {username}
      </>
    )
  }

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  if (!user) return null;

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Nav>
        <Nav.Link as={Link} to="/repositories">
          Meus Repositórios
        </Nav.Link>
        <Nav.Link as={Link} to="/tags">Tags</Nav.Link>
      </Nav>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <NavDropdown title={renderUserInfo()}>
            <NavDropdown.Item onSelect={handleLogout}>
              <FontAwesomeIcon icon={faPowerOff} />
              {' '}
              Sair
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default withRouter(withUser(AppNavbar));