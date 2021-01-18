import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';
import RepositoryList from './RepositoryList';
import Styles from './Repositories.module.scss';
import RepoTagsModal from './RepoTagsModal';

export default function Repositories() {
  const handleLoadRepositories = async () => {
    setIsLoading(true);
    try {
      const { data: repositories } = await api.get('/api/github/starred-repos');
      setRepositories(repositories);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleLoadRepositories();
  }, []);

  const [repositories, setRepositories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [currentRepository, setCurrentRepository] = useState(null);

  const onTagsEdit = (selected) => {
    setCurrentRepository(selected);
    setShowTagsModal(!showTagsModal);
  };

  return (
    <>
      <div className={Styles.RepositoriesContainer}>
        <RepositoryList {...{ isLoading, repositories, onTagsEdit }} />
      </div>
      <RepoTagsModal
        show={showTagsModal}
        onHide={() => onTagsEdit(null)}
        repository={currentRepository}
      />
    </>
  )
}
