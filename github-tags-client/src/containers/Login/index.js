import React, { useState, useEffect } from 'react'
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import GithubLogin from '../../components/GithubLogin'
import api from '../../api';
import { withUser } from '../../components/UserProvider';

function Login({ isLogged, login, history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      const { data: accessToken } = await api.post('/login', { email, password });
      login(accessToken);
      history.push('/');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSigningIn(false);
    }
  };

  return isLogged ? <Redirect to="/" /> : (
    <Container>
      <Jumbotron>
        <Row className="justify-content-between">
          <Col sm={12} xs={12} md={9}>
            <h3>Bem vindo ao Criador de Tags para busca no Github!</h3>
          </Col>
          <Col sm={12} xs={12} md={3}>
            <Form onSubmit={handleLogin}>
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
                <FontAwesomeIcon
                  icon={isSigningIn ? faSpinner : faSignInAlt}
                  spin={isSigningIn}
                />
                {' '}
                Entrar
              </Button>
            </Form>
            <GithubLogin />
            <Link to="/sign-up">
              Cadastre-se aqui
            </Link>
          </Col>
        </Row>
      </Jumbotron>
    </Container>
  )
}

export default withUser(Login);