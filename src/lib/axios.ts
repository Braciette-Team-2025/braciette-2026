import axios from "axios";
import { getAccessToken, setAccessToken } from "./auth/acces-token";
import { getRouter } from "./router";

if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  console.warn(
    "[axios] NEXT_PUBLIC_API_BASE_URL is not configured — Google OAuth redirect may not work",
  );
}

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error: unknown) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token!);
    }
  });
  failedQueue = [];
}

function isLoginPage() {
  return (
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/login")
  );
}

function redirectToLogin() {
  if (typeof window === "undefined" || isLoginPage()) return;

  const router = getRouter();
  if (router) {
    router.replace("/login");
  } else {
    window.location.replace("/login");
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) return Promise.reject(error);

    const originalRequest = error.config as typeof error.config & {
      _retry?: boolean;
    };
    const requestUrl = originalRequest?.url ?? "";
    const status = error.response?.status;

    const isRefreshEndpoint = requestUrl.includes("/auth/refresh");
    const isLoginEndpoint = requestUrl.includes("/auth/login");
    const isLogoutEndpoint = requestUrl.includes("/auth/logout");

    if (isLoginEndpoint || isLogoutEndpoint) {
      return Promise.reject(error);
    }

    if (isRefreshEndpoint && status === 401) {
      setAccessToken(null);
      redirectToLogin();
      return Promise.reject(error);
    }

    if (status !== 401 || originalRequest?._retry) {
      if (status === 401) {
        setAccessToken(null);
        redirectToLogin();
      }
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest) {
            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return api(originalRequest!);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest!._retry = true;
    isRefreshing = true;

    try {
      const refreshResponse = await api.post<{
        data: { access_token: string };
      }>("/v1/auth/refresh");

      const newToken = refreshResponse.data.data.access_token;

      setAccessToken(newToken);
      processQueue(null, newToken);

      originalRequest!.headers = originalRequest!.headers ?? {};
      originalRequest!.headers.Authorization = `Bearer ${newToken}`;

      return api(originalRequest!);
    } catch (refreshError) {
      processQueue(refreshError, null);
      setAccessToken(null);
      redirectToLogin();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
