import { create } from "zustand";

interface LoginMethodState {
  currentMethod: "social" | "email";
  setMethod: (method: "social" | "email") => void;
}

export const useLoginMethodStore = create<LoginMethodState>((set) => ({
  currentMethod: "social",
  setMethod: (method) => set({ currentMethod: method }),
}));
