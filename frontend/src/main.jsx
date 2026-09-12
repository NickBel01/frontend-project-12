import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { initSentry } from './sentry.js';

export const runApp = () => {
  initSentry();

  let container = document.getElementById('root');
  if (!container) {
    container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);
  }

  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

export default runApp;
