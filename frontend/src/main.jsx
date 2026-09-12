import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { initSentry } from './sentry.js';

export const runApp = (element) => {
  initSentry();
  const container = element || document.getElementById('root');
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

export default runApp;
