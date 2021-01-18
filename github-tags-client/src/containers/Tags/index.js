import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  InputGroup
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose, faSave } from '@fortawesome/free-solid-svg-icons';
import Styles from './Tags.module.scss';
import { withUser } from '../../components/UserProvider';

function Tags() {
  const handleLoadTags = async () => {
    setIsLoading(true);
    try {
      
    } catch (error) {
      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoadTags();
  }, []);

  const [data, setData] = useState([
    { id: 1, name: 'react' },
    { id: 2, name: 'java' },
    { id: 3, name: 'linux' },
    { id: 4, name: 'js' },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');

  return (
    <div className={Styles.TagsContainer}>
      <div className={Styles.TagForm}>
        <InputGroup>
          <FormControl
            size="lg"
            name="name"
            value={name}
            placeholder="Informe um texto de sua preferência..."
            onChange={e => setName(e.target.value)}
          />
          <InputGroup.Append>
            <Button variant="success">
              <FontAwesomeIcon icon={faSave} size="2x" />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
      <div className={Styles.TagsListContent}>
        {data.map(({ id, name }) => (
          <div className={Styles.Tag}>
            {name}
            {' '}
            <FontAwesomeIcon
              className={Styles.DeleteTagButton}
              icon={faWindowClose}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default withUser(Tags);
