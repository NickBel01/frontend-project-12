import { createStore } from 'zustand/vanilla';
import { useStore } from 'zustand';

const uiStore = createStore((set) => ({
  currentChannelId: null,
  setCurrentChannelId: (id) => set({ currentChannelId: id }),

  modal: { type: null, channelId: null },
  openModal: (type, channelId = null) => set({ modal: { type, channelId } }),
  closeModal: () => set({ modal: { type: null, channelId: null } }),
}));

export const useUI = (selector) => useStore(uiStore, selector);

export default uiStore;
