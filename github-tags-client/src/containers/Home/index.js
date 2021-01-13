import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
  state = {
    loggedUser: null
  }

  async componentDidMount() {
    const { location } = this.props;
    const search = new URLSearchParams(location.search);
    try {
      const { data: loggedUser } = await axios.get('http://localhost:8080/users/authorize', {
        params: { code: search.get('code') }
      });
      this.setState({ loggedUser })
    } catch (error) {
      this.setState({ loggedUser: { message: 'Não tem ninguém logado' } });
    }
  }
  render() {
    const { loggedUser } = this.state;
    return (
      <div>
        <h1>Bem vindo à Home! Aqui você poderá fazer buscas.</h1>
        <p>Abaixo tem o usuário Logado:</p>
        <h2>{loggedUser && JSON.stringify(loggedUser)}</h2>
      </div>
    )
  }
}
