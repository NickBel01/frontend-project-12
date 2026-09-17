import api from './client.js';

export const fetchChannels = () => api.get('/channels').then((r) => r.data);
export const createChannel = (name) => api.post('/channels', { name }).then((r) => r.data);
export const renameChannel = (id, name) => api.patch(`/channels/${id}`, { name }).then((r) => r.data);
export const removeChannel = (id) => api.delete(`/channels/${id}`).then((r) => r.data);
