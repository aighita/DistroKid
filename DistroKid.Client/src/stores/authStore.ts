import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { UserRecord } from '@/lib/openapi/models';

export interface AuthState {
  
  user: UserRecord | null;
  token: string | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  
  
  login: (token: string, user: UserRecord) => void;
  logout: () => void;
  setHydrated: (hydrated: boolean) => void;
  setUser: (user: UserRecord | null) => void;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      
      user: null,
      token: null,
      isAuthenticated: false,
      isHydrated: false,

      
      login: (token, user) =>
        set({
          token,
          user,
          isAuthenticated: true,
        }),

      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
        }),

      setHydrated: (hydrated) =>
        set({ isHydrated: hydrated }),

      setUser: (user) =>
        set({ user }),

      setToken: (token) =>
        set({ token }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => typeof window !== 'undefined' ? localStorage : null as any),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
        }
      },
    }
  )
);


