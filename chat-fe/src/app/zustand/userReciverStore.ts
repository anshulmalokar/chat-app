import { create } from "zustand";

export interface recieverState {
  reciver_name: string;
  updateReciverState: (name: string) => void;
}

export const useReciverStore = create<recieverState>((set) => ({
  reciver_name: "",
  updateReciverState: (name: string) => set({ reciver_name: name }),
}));