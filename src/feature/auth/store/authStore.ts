import { create } from "zustand";

import {
  getCurrentUser,
  refreshAccessToken,
  loginOrmawa,
  logout as apiLogout,
} from "../services/authApi";
import type { LoginOrmawaRequest } from "../types/auth.type";
import { setAccessToken } from "@/src/lib/auth/acces-token";

interface User {
  id: string;
  name: string;
  email: string;
  photo_url: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoading: boolean;

  setAuth: (accessToken: string, user: User) => void;
  clearAuth: () => void;
  initialize: () => Promise<void>;
  loginOrmawa: (credentials: LoginOrmawaRequest) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,
  isInitialized: false,
  isLoading: false,

  setAuth: (accessToken, user) => {
    set({
      accessToken,
      user,
      isAuthenticated: true,
      isInitialized: true,
      isLoading: false,
    });
  },

  clearAuth: () => {
    set({
      accessToken: null,
      user: null,
      isAuthenticated: false,
      isInitialized: true,
      isLoading: false,
    });
  },

  initialize: async () => {
    console.log("[AuthStore] initialize");

    set({
      isLoading: true,
    });

    try {
      console.log("[AuthStore] refreshing token");

      const tokenResponse = await refreshAccessToken();

      console.log("[AuthStore] refresh success", tokenResponse);

      const accessToken = tokenResponse;

      const userResponse = await getCurrentUser();

      set({
        accessToken,
        user: userResponse.data,
        isAuthenticated: true,
        isInitialized: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("[AuthStore] initialize failed", error);

      set({
        accessToken: null,
        user: null,
        isAuthenticated: false,
        isInitialized: true,
        isLoading: false,
      });
    }
  },

  loginOrmawa: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await loginOrmawa(credentials);
      const { access_token, user } = response.data;

      setAccessToken(access_token);

      set({
        accessToken: access_token,
        user: { ...user, id: user.id || "0" },
        isAuthenticated: true,
        isInitialized: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await apiLogout();
    } catch (error) {
      console.error("[AuthStore] Logout API failed", error);
    } finally {
      set({
        accessToken: null,
        user: null,
        isAuthenticated: false,
        isInitialized: true,
        isLoading: false,
      });
    }
  },
}));
