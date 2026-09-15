import { StrictMode, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { initSentry } from './sentry.js';

const runApp = () => {
  initSentry();
  const container = document.getElementById('root');
  createRoot(container).render(createElement(StrictMode, null, createElement(App)));
};

runApp();

export default runApp;
