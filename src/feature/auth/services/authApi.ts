import { setAccessToken } from "@/src/lib/auth/acces-token";
import { api } from "@/src/lib/axios";
import type {
  AuthUser,
  LoginOrmawaRequest,
  LoginOrmawaResponse,
} from "../types/auth.type";

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

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    expires_in: number;
    token_type: string;
  };
}

export interface CurrentUserResponse {
  success: boolean;
  message: string;
  data: AuthUser;
}

export function redirectToGoogleLogin() {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  window.location.href = `${API_BASE_URL}/api/v1/auth/google`;
}

export async function loginOrmawa(
  credentials: LoginOrmawaRequest,
): Promise<LoginOrmawaResponse> {
  const response = await api.post<LoginOrmawaResponse>(
    "/v1/auth/login",
    credentials,
  );

  return response.data;
}

export async function refreshAccessToken(): Promise<string> {
  const response = await api.post<RefreshTokenResponse>("/v1/auth/refresh");

  const accessToken = response.data.data.access_token;

  setAccessToken(accessToken);

  return accessToken;
}

export async function getCurrentUser(): Promise<CurrentUserResponse> {
  const response = await api.get<CurrentUserResponse>("/v1/auth/me");

  return response.data;
}

export async function logout(): Promise<void> {
  await api.post("/v1/auth/logout");

  setAccessToken(null);
}

export async function login(
  credentials: LoginOrmawaRequest,
): Promise<LoginOrmawaResponse> {
  const response = await api.post<LoginOrmawaResponse>(
    "/v1/auth/login",
    credentials,
  );

  return response.data;
}
