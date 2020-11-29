import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import App from './App';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-108483738-1');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

