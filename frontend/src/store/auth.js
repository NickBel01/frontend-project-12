import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';
import { useStore } from 'zustand';

const authStore = createStore(
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

export const useAuth = (selector) => useStore(authStore, selector);

export default authStore;
