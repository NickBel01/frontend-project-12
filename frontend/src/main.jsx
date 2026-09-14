import { StrictMode, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { initSentry } from './sentry.js';

const runApp = () => {
  localStorage.clear();
  initSentry();

  let container = document.getElementById('root');
  if (!container) {
    container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);
  }

  createRoot(container).render(createElement(StrictMode, null, createElement(App)));
};

runApp();

export default runApp;
