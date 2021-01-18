import React, { useState } from 'react';
import {
  Button,
  Form,
  FormControl,
  InputGroup
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function TagForm({ isSaving, onSubmit }) {
  const [name, setName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <FormControl
          size="lg"
          autoComplete="off"
          name="name"
          value={name}
          placeholder="Informe um texto de sua preferência..."
          required
          onChange={e => setName(e.target.value)}
        />
        <InputGroup.Append>
          <Button variant="success" type="submit">
            <FontAwesomeIcon
              icon={isSaving ? faSpinner : faSave}
              spin={isSaving}
              size="2x"
            />
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  )
}
