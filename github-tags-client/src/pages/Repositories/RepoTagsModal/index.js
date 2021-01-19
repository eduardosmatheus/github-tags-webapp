import React, { useState, useEffect } from 'react';
import { Badge, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '../../../api';
import Styles from './RepoTagsModal.module.scss';
import { getMessageFromRequest } from '../../../utils/response';

function RepositoryTag({ name, checked, onAdd, onRemove }) {
  return (
    <h3>
      <Badge
        className={Styles.AvailableTag}
        variant={!checked ? 'secondary' : 'success'}
        onClick={!checked ? onAdd : onRemove}
      >
        {name}
      </Badge>
    </h3>
  )
}

export default function RepoTagsModal({ show, onHide, repository, onAddTag, onRemoveTag }) {
  useEffect(() => {
    handleLoadExistingTags();
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState([]);

  const handleLoadExistingTags = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('/api/tags');
      setTags(data);
    } catch (error) {
      toast.error(getMessageFromRequest(error));;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal {...{ show, onHide }}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Tags ao repositório</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={Styles.AvailableTags}>
          {isLoading && <FontAwesomeIcon icon={faSpinner} spin size="6x" />}
          {!isLoading && tags.map(tag => {
            const current = repository && repository.tags.find(t => t.tag.id === tag.id);
            return (
              <RepositoryTag
                key={tag.id}
                name={tag.name}
                checked={!!current}
                onAdd={() => onAddTag({ repositoryId: repository.id, tag })}
                onRemove={() => onRemoveTag({ repositoryId: repository.id, id: current.id })}
              />
            )
          })}
        </div>
      </Modal.Body>
    </Modal>
  )
}
