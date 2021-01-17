import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './components/UserProvider';

ReactDOM.render(
  <UserProvider>
    <BrowserRouter>
      <App />
      <ToastContainer />
    </BrowserRouter>
  </UserProvider>,
  document.getElementById('root')
);

reportWebVitals();
