import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Styles from './Tags.module.scss';
import { withUser } from '../../components/UserProvider';
import TagForm from './TagForm';
import api from '../../api';
import { getMessageFromRequest } from '../../utils/response';

function Tag({ id, name, onDelete }) {
  return (
    <div className={Styles.Tag}>
      {name}
      {' '}
      <FontAwesomeIcon
        className={Styles.DeleteTagButton}
        icon={faWindowClose}
        onClick={() => onDelete(id)}
      />
    </div>
  )
}

function Tags({ user }) {
  useEffect(() => {
    handleLoadTags();
  }, []);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleLoadTags = async () => {
    setIsLoading(true);
    try {
      const { data: tags } = await api.get('/api/tags');
      setData(tags);
    } catch (error) {
      toast.error(getMessageFromRequest(error));;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTag = async (name) => {
    setIsSaving(true);
    try {
      const { data: savedTag } = await api.post('/api/tags', { name, user });
      setData([
        ...data,
        savedTag
      ].sort((a, b) => a.name - b.name));
    } catch (error) {
      toast.error(getMessageFromRequest(error));;
    } finally {
      setIsSaving(false);
    }
  }

  const handleRemoveTag = async (deletingID) => {
    try {
      await api.delete(`/api/tags/${deletingID}`);
      setData(data.filter(({ id }) => id !== deletingID));
      toast.success('Tag removida com sucesso.');
    } catch (error) {
      toast.error(getMessageFromRequest(error));;
    }
  }

  return (
    <div className={Styles.TagsContainer}>
      <div className={Styles.TagForm}>
        <TagForm
          isSaving={isSaving}
          onSubmit={handleSaveTag}
        />
      </div>
      <div className={Styles.TagsListContent}>
        {isLoading && <FontAwesomeIcon icon={faSpinner} spin size="6x" />}
        {!isLoading && data.map(item => (
          <Tag {...item} onDelete={handleRemoveTag} />
        ))}
      </div>
    </div>
  )
}

export default withUser(Tags);
