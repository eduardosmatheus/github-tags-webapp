import React from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Styles from './index.module.scss';

export default function Repository({ onTagsEdit, ...rest }) {
  const { name, full_name, html_url, description, tags } = rest;
  return (
    <div className={Styles.Repository} data-testid={`repository-${name}`}>
      <Card.Header>
        <a href={html_url} target="_blank">{full_name}</a>
      </Card.Header>
      <Card.Body className={Styles.RepositoryContent}>
        <Card.Text className={Styles.RepoDescription}>{description}</Card.Text>
        <div className={Styles.RepositoryTagsList}>
          {tags && tags.map((repoTag, idx) => (
            <Badge key={idx} variant="primary" className={Styles.RepositoryTag}>
              {repoTag.tag.name}
            </Badge>
          ))}
        </div>
        <Button variant="outline-success" onClick={() => onTagsEdit(rest)}>
          <FontAwesomeIcon icon={faTags} />
        </Button>
      </Card.Body>
    </div>
  )
}
