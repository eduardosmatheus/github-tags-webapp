import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { faGithub } from '@fortawesome/free-brands-svg-icons';

export default class GithubLogin extends Component {
  render() {
    return (
      <Button variant="dark">
        <FontAwesomeIcon icon={faGithub} />
        {' '}
        Login with Github
      </Button>
    )
  }
}
