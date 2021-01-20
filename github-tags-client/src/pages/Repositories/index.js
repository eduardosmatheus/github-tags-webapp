import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import api from '../../api';
import Repository from './Repository';
import Styles from './index.module.scss';
import RepoTagsModal from './RepoTagsModal';
import { getMessageFromRequest } from '../../utils/response';
import FuzzyFinder from '../../components/FuzzyFinder';

export default function Repositories() {
  const handleLoadRepositories = async () => {
    setIsLoading(true);
    try {
      const { data: repositories } = await api.get('/api/github/starred-repos');
      setRepositories(repositories);
    } catch (error) {
      toast.error(getMessageFromRequest(error));;
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

  const handleAddTag = async (payload) => {
    try {
      const { data: storedRepoTag } = await api
        .post(`/api/repositories/${payload.repositoryId}/tags`, payload);
      const updatedRepositories = repositories.map(repository => {
        if (repository.id === storedRepoTag.repositoryId) {
          return {
            ...repository,
            tags: [...repository.tags, storedRepoTag]
          };
        }
        return repository;
      });
      setRepositories(updatedRepositories);
      setCurrentRepository({
        ...currentRepository,
        tags: [...currentRepository.tags, storedRepoTag]
      });
    } catch (error) {
      toast.error(getMessageFromRequest(error));;
    }
  };

  const handleRemoveTag = async ({ id, repositoryId }) => {
    try {
      await api.delete(`/api/repositories/${repositoryId}/tags/${id}`);
      const updatedRepositories = repositories.map(repository => {
        if (repository.id === repositoryId) {
          const updatedTags = repository.tags.filter(repoTag => repoTag.id !== id);
          return {
            ...repository,
            tags: updatedTags
          };
        }
        return repository;
      });
      setRepositories(updatedRepositories);
      setCurrentRepository({
        ...currentRepository,
        tags: currentRepository.tags.filter(repoTag => repoTag.id !== id)
      });
    } catch (error) {
      toast.error(getMessageFromRequest(error));;
    }
  };

  const mapRepositoryTagsNames = (row) => {
    return row.tags.map(({ tag }) => tag.name);
  };

  return (
    <>
      <div className={Styles.RepositoriesContainer}>
        <FuzzyFinder
          data={repositories}
          isLoading={isLoading}
          rowRenderer={row => (
            <Repository {...{ ...row, onTagsEdit }} />
          )}
          keyExtractor={row => row.id}
          placeholder="Informe uma tag (ou parte dela)..."
          getHint={mapRepositoryTagsNames}
        />
      </div>
      <RepoTagsModal
        show={showTagsModal}
        onHide={() => onTagsEdit(null)}
        repository={currentRepository}
        onAddTag={handleAddTag}
        onRemoveTag={handleRemoveTag}
      />
    </>
  )
}
