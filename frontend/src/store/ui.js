import { createStore } from 'zustand/vanilla';
import { createContext, useContext } from 'react';
import { useStore } from 'zustand';

export const createUIStore = () => createStore((set) => ({
  currentChannelId: null,
  setCurrentChannelId: (id) => set({ currentChannelId: id }),

  modal: { type: null, channelId: null },
  openModal: (type, channelId = null) => set({ modal: { type, channelId } }),
  closeModal: () => set({ modal: { type: null, channelId: null } }),
}));

export const UIContext = createContext(null);

export const useUI = (selector) => {
  const store = useContext(UIContext);
  return useStore(store, selector);
};
