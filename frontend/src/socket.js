import { io } from 'socket.io-client';

const socket = io({
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 500,
});

export default socket;
