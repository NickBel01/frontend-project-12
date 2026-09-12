import axios from 'axios';
import useAuthStore from './store/auth.js';

const api = axios.create({
  baseURL: '/api/v1',
});

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchChannels = () => api.get('/channels').then((r) => r.data);
export const fetchMessages = () => api.get('/messages').then((r) => r.data);

export const createChannel = (name) => api.post('/channels', { name }).then((r) => r.data);
export const renameChannel = (id, name) => api.patch(`/channels/${id}`, { name }).then((r) => r.data);
export const removeChannel = (id) => api.delete(`/channels/${id}`).then((r) => r.data);

export const sendMessage = (body, channelId, username) => api.post('/messages', { body, channelId, username }).then((r) => r.data);

export default api;
