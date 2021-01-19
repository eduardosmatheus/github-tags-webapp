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
  

  render() {
    return (
      <div className="home">
        Bem vindo à Home!
      </div>
    )
  }
}

export default withUser(Home);