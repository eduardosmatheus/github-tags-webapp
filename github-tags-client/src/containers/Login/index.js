import React, { Component } from 'react'
import GithubLogin from '../../components/GithubLogin'

export default class Login extends Component {
  render() {
    return (
      <div className="App">
        Bem vindo ao Criador de Tags para busca no Github!
        <GithubLogin />
      </div>
    )
  }
}
