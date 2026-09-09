import { signInWithPopup } from "firebase/auth";
import { firebaseAuth, googleProvider } from "@/src/lib/firebase";
import { setAccessToken } from "@/src/lib/auth/acces-token";
import { api } from "@/src/lib/axios";
import type {
  AuthUser,
  LoginOrmawaRequest,
  LoginOrmawaResponse,
} from "../types/auth.type";

export interface GoogleLoginResponse {
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

/**
 * Login via Google menggunakan Firebase popup.
 * Flow:
 *  1. Buka Google consent popup via Firebase.
 *  2. Ambil ID token dari Firebase credential.
 *  3. POST id_token ke backend POST /api/v1/auth/google.
 *  4. Backend memvalidasi token & mengembalikan access_token + user.
 */
export async function loginWithGoogle(): Promise<GoogleLoginResponse> {
  const result = await signInWithPopup(firebaseAuth, googleProvider);
  const idToken = await result.user.getIdToken();

  const response = await api.post<GoogleLoginResponse>("/v1/auth/google", {
    id_token: idToken,
  });

  const { access_token } = response.data.data;
  setAccessToken(access_token);

  return response.data;
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
