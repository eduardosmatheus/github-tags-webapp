import React, { useState, useEffect } from 'react';
import { Badge, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import api from '../../../api';
import Styles from './RepoTagsModal.module.scss';

export default function RepoTagsModal({ show, onHide, repository }) {
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
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const repositoryTags = repository ? repository.tags : [];

  return (
    <Modal {...{ show, onHide }}>
      <Modal.Header closeButton>
        <Modal.Title>Adicionar Tags ao repositório</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading && <FontAwesomeIcon icon={faSpinner} spin size="6x" />}
        <p>Relacionadas</p>
        <div className={Styles.RepositoryTags}>
          {repositoryTags.map(({ id, tag }) => (
            <h3>
              <Badge
                className={Styles.AvailableTag}
                variant="success"
              >
                {tag.name}
              </Badge>
            </h3>
          ))}
        </div>
        <p>Disponíveis</p>
        <div className={Styles.AvailableTags}>
          {!isLoading && tags.map(tag => (
            <h3>
              <Badge
                className={Styles.AvailableTag}
                variant="secondary"
              >
                {tag.name}
              </Badge>
            </h3>
          ))}
        </div>
      </Modal.Body>
    </Modal>
  )
}
