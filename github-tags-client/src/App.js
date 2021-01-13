import React from 'react';
import './App.scss';
import GithubLogin from './components/GithubLogin';

function App() {
  return (
    <div className="App">
      Bem vindo ao Criador de Tags para busca no Github!
      <GithubLogin />
    </div>
  );
}

export default App;
