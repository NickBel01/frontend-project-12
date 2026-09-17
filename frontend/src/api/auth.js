import api from './client.js';

export const login = (values) => api.post('/login', values).then((r) => r.data);
export const signup = (values) => api.post('/signup', values).then((r) => r.data);
