import React from 'react';
import {
  Jumbotron,
  Container,
  Row,
  Col,
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import GithubLogin from '../../components/GithubLogin'
import { withUser } from '../../components/UserProvider';

function Login({ isLogged, login, history }) {
  return isLogged ? <Redirect to="/" /> : (
    <Container>
      <Jumbotron>
        <Row className="justify-content-between">
          <Col sm={12} xs={12} md={9}>
            <h3>Bem vindo ao Criador de Tags para busca no Github!</h3>
          </Col>
          <Col sm={12} xs={12} md={3}>
            <GithubLogin />
          </Col>
        </Row>
      </Jumbotron>
    </Container>
  )
}

export default withUser(Login);