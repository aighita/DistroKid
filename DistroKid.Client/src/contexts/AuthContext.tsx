"use client";

import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import type { UserRecord } from '@/lib/openapi/models';
import { UserApi } from '@/infrastructure/apis/client';
import { ResponseError } from '@/infrastructure/apis/client/runtime';
import { getApiConfig } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';

export interface AuthContextType {
  user: UserRecord | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, user: UserRecord) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);





export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}





export function AuthProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [isValidatingSession, setIsValidatingSession] = useState(false);

  
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    if (!token || !user?.id) {
      setIsValidatingSession(false);
      return;
    }

    let ignore = false;
    setIsValidatingSession(true);

    const validatePersistedSession = async () => {
      try {
        const api = new UserApi(getApiConfig());
        await api.apiUserGetByIdIdGet({ id: user.id });
      } catch (error) {
        if (ignore) {
          return;
        }

        if (error instanceof ResponseError && (error.response.status === 401 || error.response.status === 404)) {
          logout();

          if (typeof window !== 'undefined') {
            localStorage.removeItem('userAvatarFileId');
            localStorage.removeItem('userAvatarUrl');
          }
        }
      } finally {
        if (!ignore) {
          setIsValidatingSession(false);
        }
      }
    };

    void validatePersistedSession();

    return () => {
      ignore = true;
    };
  }, [mounted, logout, token, user?.id]);

  
  
  return (
    <AuthContext.Provider
      value={{
        user: mounted ? user : null,
        token: mounted ? token : null,
        isAuthenticated: mounted ? isAuthenticated : false,
        isLoading: !mounted || isValidatingSession,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
