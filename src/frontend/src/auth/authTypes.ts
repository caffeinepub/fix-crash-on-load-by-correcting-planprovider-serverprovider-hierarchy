export interface AuthUser {
  email: string;
  passwordHash: string;
  createdAt: number;
}

export interface AuthSession {
  email: string;
  loginTime: number;
}

export const AUTH_STORAGE_KEY = 'auracloud_users';
export const SESSION_STORAGE_KEY = 'auracloud_session';
