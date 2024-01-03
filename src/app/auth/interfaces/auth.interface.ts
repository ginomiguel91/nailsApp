export interface AuthResponse {
  message?: string;
  token?: string;
}
export interface User {
  username: string;
  email?: string;
}
export interface JwtToken {
  iss?: string;
  sub?: string;
  exp?: number;
  iat?: number;
  scope?: string;
}
