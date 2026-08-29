import { create } from 'zustand';

const useUIStore = create((set) => ({
  currentChannelId: null,
  setCurrentChannelId: (id) => set({ currentChannelId: id }),
}));

export default useUIStore;
