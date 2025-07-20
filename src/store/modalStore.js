// modalStore.js
import { create } from 'zustand';

export const useModalStore = create((set) => ({
  isModalOpen: false,

  mode: null, 

  targetData: null,

  openModal: (mode, targetData = null) => 
    set({ isModalOpen: true, mode, targetData }),

  closeModal: () => 
    set({ isModalOpen: false, mode: null, targetData: null }),
}));
