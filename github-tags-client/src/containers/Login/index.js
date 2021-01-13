import React, { useEffect } from 'react'
import GithubLogin from '../../components/GithubLogin'

export default function Login() {
  useEffect(() => { localStorage.clear() }, []);
  return (
    <div className="App">
      Bem vindo ao Criador de Tags para busca no Github!
      <GithubLogin />
    </div>
  )
}
