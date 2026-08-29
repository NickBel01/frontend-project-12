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
export const fetchMessages = (channelId) => api.get(`/channels/${channelId}/messages`).then((r) => r.data);

export default api;
