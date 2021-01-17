import React from 'react';
import { toast } from 'react-toastify';
import { Card } from 'react-bootstrap';
import Styles from './RepositoryList.module.scss';

function Repository({ name, full_name, html_url, description }) {
  return (
    <div className={Styles.Repository}>
      <Card.Header>
        <a href={html_url} target="_blank">{full_name}</a>
      </Card.Header>
      <Card.Body>
        <Card.Text className={Styles.RepoDescription}>{description}</Card.Text>
      </Card.Body>
    </div>
  )
}

export default function RepositoryList({ repositories }) {
  
  return (
    <div className={Styles.RepositoryListContainer}>
      {repositories.map(Repository)}
    </div>
  )
}
