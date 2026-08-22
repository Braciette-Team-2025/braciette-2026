import { create } from "zustand";

import { getCurrentUser, refreshAccessToken } from "../services/authApi";

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
}));
