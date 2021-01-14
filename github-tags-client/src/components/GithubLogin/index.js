import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default class GithubLogin extends Component {
  mountLoginAuthorizationParams = () => {
    const defaultParams = {
      client_id: 'b34d2a6fc9da4d853f0a',
      redirect_url: 'http://localhost:3000/home'
    };
    return Object.keys(defaultParams).reduce((queryString, param) => {
      const value = defaultParams[param];
      if (!queryString.includes('?')) {
        return `?${param}=${value}`;
      }
      return `${queryString}&${param}=${value}`;
    }, '');
  }

  handleOpenAuth = () => {
    const authParams = this.mountLoginAuthorizationParams();
    window.location.replace(`https://github.com/login/oauth/authorize${authParams}`);
  }

  render() {
    return (
      <Button variant="dark" onClick={this.handleOpenAuth}>
        <FontAwesomeIcon icon={faGithub} />
        {' '}
        Fazer login com o Github
      </Button>
    )
  }
}
