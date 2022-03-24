import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import OAuth from './components/OAuth.jsx';
import store from './store';
import styles from './stylesheets/style.scss'

render (
  <Provider store = {store}>
    <script src="https://apis.google.com/js/platform.js?onload=renderButton" async defer></script>
    <App />
  </Provider>,
  document.getElementById('root')
); 
