import { create } from "zustand";

import {
  getCurrentUser,
  refreshAccessToken,
} from "../login/services/googleAuth";

interface User {
  name: string;
  email: string;
  photo_url: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;

  setAuth: (accessToken: string, user: User) => void;

  clearAuth: () => void;

  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,
  isInitialized: false,

  setAuth: (accessToken, user) => {
    set({
      accessToken,
      user,
      isAuthenticated: true,
      isInitialized: true,
    });
  },

  clearAuth: () => {
    set({
      accessToken: null,
      user: null,
      isAuthenticated: false,
      isInitialized: true,
    });
  },

  initialize: async () => {
    try {
      const tokenResponse = await refreshAccessToken();

      const accessToken = tokenResponse.data.access_token;

      const userResponse = await getCurrentUser(accessToken);

      set({
        accessToken,
        user: userResponse.data,
        isAuthenticated: true,
        isInitialized: true,
      });
    } catch (error) {
      console.error("Failed to initialize authentication:", error);

      set({
        accessToken: null,
        user: null,
        isAuthenticated: false,
        isInitialized: true,
      });
    }
  },
}));
