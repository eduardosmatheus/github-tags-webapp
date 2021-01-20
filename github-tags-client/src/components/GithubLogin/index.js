import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { toQueryParams } from '../../utils/requests';

export default function GithubLogin() {
  const handleOpenAuth = () => {
    const authParams = toQueryParams({
      client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
      redirect_url: 'http://localhost:3000/'
    });;
    window.location.replace(`https://github.com/login/oauth/authorize${authParams}`);
  };
  return (
    <Button variant="dark" onClick={handleOpenAuth}>
      <FontAwesomeIcon icon={faGithub} />
      {' '}
      Fazer login com o Github
    </Button>
  )
}
