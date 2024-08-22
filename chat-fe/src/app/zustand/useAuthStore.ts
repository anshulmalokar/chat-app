import { create } from "zustand";

export interface authState {
  authName: string;
  updateAuthName: (name: string) => void;
}

export const useAuthStore = create<authState>((set) => ({
  authName: "",
  updateAuthName: (name: string) => set({ authName: name }),
}));
