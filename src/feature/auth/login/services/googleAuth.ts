import axios from "axios";
import { api } from "@/src/lib/axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface GoogleCallbackResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    expires_in: number;
    token_type: string;
    user: {
      name: string;
      email: string;
      photo_url: string;
    };
  };
}

export function redirectToGoogleLogin() {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  window.location.href = `${API_BASE_URL}/api/v1/auth/google`;
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    expires_in: number;
    token_type: string;
  };
}

export async function refreshAccessToken(): Promise<RefreshTokenResponse> {
  const response = await api.post<RefreshTokenResponse>("/v1/auth/refresh");

  return response.data;
}

export interface CurrentUserResponse {
  success: boolean;
  message: string;
  data: {
    name: string;
    email: string;
    photo_url: string;
  };
}

export async function getCurrentUser(
  accessToken: string,
): Promise<CurrentUserResponse> {
  const response = await api.get<CurrentUserResponse>("/v1/auth/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response.data;
}
