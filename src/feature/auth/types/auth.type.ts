export interface LoginOrmawaRequest {
  email: string;
  password: string;
}

export interface LoginOrmawaResponse {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    expires_in: number;
    token_type: string;
    user: {
      id?: string;
      name: string;
      email: string;
      photo_url: string;
    };
  };
}
