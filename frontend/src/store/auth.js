import { createStore } from 'zustand/vanilla';
import { createContext, useContext } from 'react';
import { useStore } from 'zustand';

export const createAuthStore = () => createStore((set) => ({
  token: null,
  username: null,
  setAuth: (token, username) => set({ token, username }),
  removeAuth: () => set({ token: null, username: null }),
}));

export const AuthContext = createContext(null);

export const useAuth = (selector) => {
  const store = useContext(AuthContext);
  return useStore(store, selector);
};
