import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Jumbotron
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faArrowLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import api from '../../api';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const { data: storedUser } = await api.post('/api/users', {
        email, password, fullName
      });
    } catch (error) {
      
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
    >
      <Jumbotron>
        <Row className="justify-content-between">
          <Col>
            <h3>Cadastre-se agora mesmo.</h3>
          </Col>
          <Col style={{ borderLeft: '1px solid #fff' }}>
            <Form onSubmit={handleSignUp}>
              <FormGroup>
                <FormLabel>Nome completo</FormLabel>
                <FormControl
                  type="text"
                  name="fullName"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>E-mail</FormLabel>
                <FormControl
                  type="email"
                  name="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Senha</FormLabel>
                <FormControl
                  type="password"
                  name="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </FormGroup>
              <Button type="submit" variant="success">
                <FontAwesomeIcon icon={faSignInAlt} />
                {' '}
                Cadastrar
              </Button>
            </Form>
          </Col>
        </Row>
      </Jumbotron>
    </Container>
  )
}
