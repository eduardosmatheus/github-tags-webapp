import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import Styles from './Tags.module.scss';
import { withUser } from '../../components/UserProvider';
import TagForm from './TagForm';
import api from '../../api';

function Tag({ name }) {
  return (
    <div className={Styles.Tag}>
      {name}
      {' '}
      <FontAwesomeIcon
        className={Styles.DeleteTagButton}
        icon={faWindowClose}
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
      toast.error(error.message);
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
      toast.error(error.message);
    } finally {
      setIsSaving(false);
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
        {!isLoading && data.map(Tag)}
      </div>
    </div>
  )
}

export default withUser(Tags);
