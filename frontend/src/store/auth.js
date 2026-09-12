import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';
import { createContext, useContext } from 'react';
import { useStore } from 'zustand';

export const createAuthStore = () => createStore(
  persist(
    (set) => ({
      token: null,
      username: null,
      setAuth: (token, username) => set({ token, username }),
      removeAuth: () => set({ token: null, username: null }),
    }),
    {
      name: 'auth-storage',
    },
  ),
);

export const AuthContext = createContext(null);

export const useAuth = (selector) => {
  const store = useContext(AuthContext);
  return useStore(store, selector);
};
