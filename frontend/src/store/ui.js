import { create } from 'zustand';

const useUIStore = create((set) => ({
  currentChannelId: null,
  setCurrentChannelId: (id) => set({ currentChannelId: id }),

  modal: { type: null, channelId: null },
  openModal: (type, channelId = null) => set({ modal: { type, channelId } }),
  closeModal: () => set({ modal: { type: null, channelId: null } }),
}));

export default useUIStore;
