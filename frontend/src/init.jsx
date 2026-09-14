import { StrictMode, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

let root = null;

export default () => {
  localStorage.clear();

  let container = document.getElementById('root');
  if (!container) {
    container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);
  }

  if (!root) {
    root = createRoot(container);
  }

  root.render(createElement(StrictMode, null, createElement(App)));
};
