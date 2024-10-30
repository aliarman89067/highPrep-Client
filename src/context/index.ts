import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UseModal {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}
interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
  setUser: (values: Partial<User>) => void;
}

export const useLoginModal = create<UseModal>((set) => ({
  isOpen: false,
  openModal: () => set(() => ({ isOpen: true })),
  closeModal: () => set(() => ({ isOpen: false })),
}));

export const useSignupModal = create<UseModal>((set) => ({
  isOpen: false,
  openModal: () => set(() => ({ isOpen: true })),
  closeModal: () => set(() => ({ isOpen: false })),
}));

export const useUser = create<User>()(
  persist(
    (set) => ({
      _id: "",
      name: "",
      email: "",
      image: "",
      setUser: (values: Partial<User>) =>
        set((state) => ({ ...state, ...values })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
