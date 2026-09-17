import { StrictMode, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import authStore from './store/auth.js';
import App from './app/App.jsx';

let root = null;

export default function init() {
  authStore.getState().removeAuth();
  localStorage.clear();

  let container = document.getElementById('root');
  if (!container) {
    container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);
  }

  if (root) {
    root.unmount();
    root = null;
  }

  container.innerHTML = '';
  root = createRoot(container);
  root.render(createElement(StrictMode, null, createElement(App)));
}
