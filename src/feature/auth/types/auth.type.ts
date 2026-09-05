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

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  photo_url: string;
  role: string;
  has_voted_bem: boolean;
  has_voted_dpm: boolean;
  has_voted_hima: boolean;
  has_voted_ukm: boolean;
}
