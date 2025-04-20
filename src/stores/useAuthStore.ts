/* eslint-disable @typescript-eslint/no-unused-vars */
// File: lib/stores/useAuthStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { UserDoc, UserRole } from "../../convex/user/entities/user.type";

interface AuthState {
  // State
  user: UserDoc | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: UserDoc | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (isLoading: boolean) => void;

  // Auth methods
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    name: string;
    phone: string;
    role?: UserRole;
  }) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      // Actions
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),
      setToken: (token) => set({ token }),
      setLoading: (isLoading) => set({ isLoading }),

      // Auth methods
      login: async (email, password) => {
        set({ isLoading: true });
        try {
          // This will be implemented in the auth wrapper
          // to avoid direct dependency on Convex in the store
          throw new Error("Login method must be implemented by auth wrapper");
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true });
        try {
          // This will be implemented in the auth wrapper
          // to avoid direct dependency on Convex in the store
          throw new Error(
            "Register method must be implemented by auth wrapper"
          );
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ token: state.token }),
    }
  )
);
