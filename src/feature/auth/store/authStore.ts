import { create } from "zustand";

import {
  getCurrentUser,
  refreshAccessToken,
  login as apiLogin,
  loginOrmawa as apiLoginOrmawa,
  logout as apiLogout,
} from "../services/authApi";
import type { AuthUser, LoginOrmawaRequest } from "../types/auth.type";
import { setAccessToken } from "@/src/lib/auth/acces-token";

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  isLoading: boolean;

  setAuth: (accessToken: string, user: AuthUser) => void;
  clearAuth: () => void;
  markAsVoted: (type: string) => void;
  initialize: () => Promise<void>;
  login: (credentials: LoginOrmawaRequest) => Promise<void>;
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

  markAsVoted: (type) => {
    set((state) => {
      if (!state.user) {
        return state;
      }

      const normalizedType = type.toUpperCase();

      switch (normalizedType) {
        case "BEM":
          return {
            user: {
              ...state.user,
              has_voted_bem: true,
            },
          };

        case "DPM":
          return {
            user: {
              ...state.user,
              has_voted_dpm: true,
            },
          };

        case "HIMA":
          return {
            user: {
              ...state.user,
              has_voted_hima: true,
            },
          };

        case "UKM":
          return {
            user: {
              ...state.user,
              has_voted_ukm: true,
            },
          };

        default:
          return state;
      }
    });
  },

  initialize: async () => {
    set({
      isLoading: true,
    });

    try {
      const accessToken = await refreshAccessToken();

      const userResponse = await getCurrentUser();

      set({
        accessToken,
        user: userResponse.data,
        isAuthenticated: true,
        isInitialized: true,
        isLoading: false,
      });
    } catch {
      set({
        accessToken: null,
        user: null,
        isAuthenticated: false,
        isInitialized: true,
        isLoading: false,
      });
    }
  },

  login: async (credentials) => {
    set({
      isLoading: true,
    });

    try {
      const response = await apiLogin(credentials);
      const { access_token } = response.data;

      setAccessToken(access_token);

      // Ambil data terbaru dari /auth/me,
      // termasuk role dan status has_voted.
      const userResponse = await getCurrentUser();

      set({
        accessToken: access_token,
        user: userResponse.data,
        isAuthenticated: true,
        isInitialized: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
      });

      throw error;
    }
  },

  loginOrmawa: async (credentials) => {
    set({
      isLoading: true,
    });

    try {
      const response = await apiLoginOrmawa(credentials);
      const { access_token } = response.data;

      setAccessToken(access_token);

      // Ambil data /auth/me setelah token tersedia.
      // Ini memastikan role + has_voted masuk ke store.
      const userResponse = await getCurrentUser();

      set({
        accessToken: access_token,
        user: userResponse.data,
        isAuthenticated: true,
        isInitialized: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        isLoading: false,
      });

      throw error;
    }
  },

  logout: async () => {
    set({
      isLoading: true,
    });

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
