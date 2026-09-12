import runApp from '../frontend/src/main.jsx';

export default (socket) => {
  if (socket) {
    window.__testSocket = socket;
  }
  runApp();
};
