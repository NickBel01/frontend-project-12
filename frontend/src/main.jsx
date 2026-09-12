import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { initSentry } from './sentry.js';

export const runApp = (element) => {
  initSentry();
  createRoot(element).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

export default runApp;
