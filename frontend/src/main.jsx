import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { initSentry } from './sentry.js';

export const runApp = (element) => {
  console.log('runApp arg:', element, 'typeof:', typeof element, 'isElement:', element instanceof Element);
  initSentry();

  const container = element || document.getElementById('root');
  console.log('container:', container);

  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

export default runApp;
