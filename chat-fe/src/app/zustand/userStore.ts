import { create } from "zustand";

export interface userStoreState {
  usersArray:{
    _id: string,
    username: string
  }[];
  updateUsers: (users: {
    _id: string,
    username: string
  }[]) => void;
}

export const useUsersStore = create<userStoreState>((set) => ({
  usersArray: [],
  updateUsers: (users: {
    _id: string,
    username: string
  }[]) => set({ usersArray: users }),
}));
