const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

function getApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
  }

  return API_BASE_URL;
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
  data: {
    name: string;
    email: string;
    photo_url: string;
  };
}

export async function refreshAccessToken(): Promise<string> {
  const response = await fetch(`${getApiBaseUrl()}/api/v1/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      body?.message ?? `Failed to refresh access token (${response.status})`,
    );
  }

  return body.data.access_token;
}

export async function getCurrentUser(
  accessToken: string,
): Promise<CurrentUserResponse> {
  const response = await fetch(`${getApiBaseUrl()}/api/v1/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  const body = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      body?.message ?? `Failed to get current user (${response.status})`,
    );
  }

  return body;
}

export async function logout(): Promise<void> {
  const response = await fetch(`${getApiBaseUrl()}/api/v1/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);

    throw new Error(body?.message ?? `Failed to logout (${response.status})`);
  }
}
