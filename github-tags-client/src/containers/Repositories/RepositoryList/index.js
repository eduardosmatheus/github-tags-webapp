import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { faSpinner, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Styles from './RepositoryList.module.scss';

function Repository({ full_name, html_url, description }) {
  return (
    <div className={Styles.Repository}>
      <Card.Header>
        <a href={html_url} target="_blank">{full_name}</a>
      </Card.Header>
      <Card.Body className={Styles.RepositoryContent}>
        <Card.Text className={Styles.RepoDescription}>{description}</Card.Text>
        <Button variant="outline-success">
          <FontAwesomeIcon icon={faTags} />
        </Button>
      </Card.Body>
    </div>
  )
}

export default function RepositoryList({ isLoading, repositories }) {
  return (
    <div className={Styles.RepositoryListContainer}>
      {isLoading && <FontAwesomeIcon icon={faSpinner} spin size="6x" />}
      {!isLoading && (
        <div className={Styles.RepositoryListContent}>
          {repositories.map(Repository)}
        </div>
      )}
    </div>
  )
}