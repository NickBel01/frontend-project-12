import api from './client.js';

export const fetchMessages = () => api.get('/messages').then((r) => r.data);
export const sendMessage = (body, channelId, username) => api.post('/messages', { body, channelId, username }).then((r) => r.data);
